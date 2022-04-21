import {Context, ContractPromiseBatch, logging, PersistentVector, u128} from "near-sdk-core"
import { AccountId, ONE_NEAR, XCC_GAS, assertSelf, assertSingleSuccess } from "../../utils"
import { Registrant, Vote, registrants, votes } from "./models"


const MAX_AMOUNT_LIMITATION: u128 = u128.mul(ONE_NEAR, u128.from(3));
const MIN_AMOUNT_LIMITATION: u128 = u128.mul(ONE_NEAR, u128.from(0.1));

@nearBindgen
export class Contract {
  private owner: AccountId

  constructor(owner: AccountId) {
    this.owner = owner
  }

  /**
   * Initialization
   */
  @mutateState()
  initializePoll(description: string): u32 {
    const contribution = Context.attachedDeposit
    this.assertContribution(contribution)

    assert(description.length > 0, "Description length must be higher than 0")
    assert(description.length < Registrant.max_length(), "Description length must be less than " + Registrant.max_length().toString())

    const new_registrant = new Registrant(description)
    new_registrant.addContribution(contribution)
    registrants.push(new_registrant)
    ContractPromiseBatch.create(Context.contractName)
        .transfer(contribution)
    return registrants.length - 1
  }

  @mutateState()
  private resetRegistrants(): void {
    for (let i = 0; i < registrants.length; i++) {
      this.assertRegistrantHasNoContributions(registrants[i])
      registrants.swap_remove(i)
    }
    votes.clear()
  }

  @mutateState()
  vote(registrant: u32): void {
    const contribution = Context.attachedDeposit
    this.assertContribution(contribution)
    this.assertRegistrantExists(registrant)

    const registrantVotes = votes.contains(registrant)
        ? votes.getSome(registrant)
        : new Array<Vote>()
    registrantVotes.push(new Vote(contribution))
    votes.set(registrant, registrantVotes)
    const updated = registrants[registrant]
    updated.addContribution(contribution)
    registrants.replace(registrant, updated)
    ContractPromiseBatch.create(Context.contractName)
        .transfer(contribution)
  }

  listVotes(registrant: u32): Vote[] {
    this.assertRegistrantExists(registrant)
    return votes.getSome(registrant)
  }

  listRegistrants(): Registrant[] {
    const result = new Array<Registrant>();
    for (let i = 0; i < registrants.length; i++) {
      const entry = registrants[i]
      result.push(entry)
    }
    return result
  }

  @mutateState()
  completePoll(): void {
    this.assertOwner()

    let winningRegistrant: Registrant = new Registrant('Empty')
    let totalContributions = u128.Zero
    for (let i = 0; i < registrants.length; i++) {
      const registrant = registrants[i]
      winningRegistrant = u128.gt(registrant.contributions, winningRegistrant.contributions) ? registrant : winningRegistrant
      totalContributions = u128.add(totalContributions, registrant.contributions)
      registrant.contributions = u128.Zero
      registrants.replace(i, registrant)
    }

    assert(winningRegistrant.creator, "Winner?")

    const to_self = Context.contractName
    const to_creator = ContractPromiseBatch.create(winningRegistrant.creator)

    const promise = to_creator.transfer(totalContributions)
    promise.then(to_self).function_call("completeTransferPoll", '{}', u128.Zero, XCC_GAS)
  }

  @mutateState()
  completeTransferPoll(): void {
    assertSelf()
    assertSingleSuccess()

    logging.log("Poll transfer is done.")
    this.resetRegistrants()
  }

  private assertOwner(): void {
    const caller = Context.predecessor
    assert(this.owner == caller, "Owner?")
  }

  private assertContribution(contribution: u128): void {
    assert(u128.le(contribution, MAX_AMOUNT_LIMITATION), `Should be lower than ${MAX_AMOUNT_LIMITATION.toString()} NEAR`)
    assert(u128.ge(contribution, MIN_AMOUNT_LIMITATION), `Should be higher than ${MIN_AMOUNT_LIMITATION.toString()}`)
  }

  private assertRegistrantExists(index: u32): void {
    assert(registrants.containsIndex(index), "registrant not found")
  }

  private assertRegistrantCreator(registrant: Registrant): void {
    const caller = Context.predecessor
    assert(registrant.creator === caller, "Registrant?")
  }

  private assertRegistrantHasNoContributions(registrant: Registrant): void {
    assert(u128.eq(registrant.contributions, u128.Zero), "Not finalized...")
  }

}
