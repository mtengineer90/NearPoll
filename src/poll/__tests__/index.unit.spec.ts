import {VMContext, u128, PersistentVector, PersistentUnorderedMap, Context} from "near-sdk-as";
import { Registrant, Vote } from "../assembly/models";
import { Contract } from "../assembly";
import * as util from "../../utils";

/**
 * == CONFIG VALUES ============================================================
 */
const OWNER_ACCOUNT_ID = "voting_commissioner";
const CREATOR_ACCOUNT_ID = "alice";
const VOTER_ACCOUNT_ID = "bob";
const ONE_NEAR = u128.from('1000000000000000000000000');

/**
 * == HELPER FUNCTIONS =========================================================
 */
const useVoterAsSigner = (): void => {
    VMContext.setSigner_account_id(VOTER_ACCOUNT_ID);
};

const useCreatorAsSigner = (): void => {
    VMContext.setSigner_account_id(CREATOR_ACCOUNT_ID);
};

const attachBalance = (near: number): void => {
    VMContext.setAccount_balance(u128.mul(ONE_NEAR, u128.from(near)));
};

const attachDeposit = (near: number): void => {
    VMContext.setAttached_deposit(u128.mul(ONE_NEAR, u128.from(near)));
};

const votes = (): PersistentUnorderedMap<i32, Vote[]> => {
    return new PersistentUnorderedMap<i32, Vote[]>('v');
};

const registrants = (): PersistentVector<Registrant> => {
    return new PersistentVector<Registrant>("i");
};

let voting: Contract

beforeEach(() => {
    voting = new Contract(OWNER_ACCOUNT_ID)
})

/**
 * == UNIT TESTS ==============================================================
 */

describe('New registrant', () => {
    beforeEach(() => {
        useCreatorAsSigner()
        attachBalance(5)
    })

    it('has valid contributions and creator', () => {
        attachDeposit(2)
        const index = voting.initializePoll('Test 1')
        const new_registrant = registrants()[index]
        expect(new_registrant).toBeTruthy()
        expect(new_registrant.contributions).toBe(u128.mul(ONE_NEAR, u128.from(2)))
        expect(new_registrant.creator).toBe(CREATOR_ACCOUNT_ID)
    })

    it('is added to the list with no votes', () => {
        const index = voting.initializePoll('Test 2')
        expect(registrants().length).toBe(1)
        expect(votes().contains(index)).toBeFalsy()
    })
})

describe('Voting', () => {
    beforeEach(() => {
        useVoterAsSigner()
        attachBalance(5)
    })

    it('records a vote and adds contributions', () => {
        attachDeposit(1)
        const index = voting.initializePoll('Test')
        voting.vote(index)
        expect(votes().contains(index)).toBeTruthy()
        // expect(voting.listVotes(index)).toBeTruthy()
        const i_votes = votes().getSome(index)
        expect(i_votes[0].voter).toBe(VOTER_ACCOUNT_ID)
        expect(i_votes[0].contribution).toBe(u128.from(ONE_NEAR))
        expect(registrants()[index].contributions).toBe(u128.mul(ONE_NEAR, u128.from(2)))
    })

})

describe('Finalize voting', () => {

    it('distributes contributions to the registrant with the most votes', () => {
        VMContext.setSigner_account_id(CREATOR_ACCOUNT_ID)
        attachBalance(5)
        attachDeposit(2)
        const w_registrant = voting.initializePoll('Test W')
        const l_registrant = voting.initializePoll('Test L')

        expect(Context.accountBalance).toBe(u128.mul(ONE_NEAR, u128.from(3)))

        VMContext.setSigner_account_id(VOTER_ACCOUNT_ID)
        attachBalance(5)
        attachDeposit(1)
        voting.vote(w_registrant)
        voting.vote(w_registrant)

        expect(votes().contains(w_registrant)).toBeTruthy()
        expect(votes()).toHaveLength(1)
        const wi_votes = votes().getSome(w_registrant)
        expect(wi_votes).toHaveLength(2)

        voting.vote(l_registrant)
        expect(votes().contains(l_registrant)).toBeTruthy()
        expect(votes()).toHaveLength(2)
        const li_votes = votes().getSome(l_registrant)
        expect(li_votes).toHaveLength(1)

        VMContext.setPredecessor_account_id(OWNER_ACCOUNT_ID)
        attachBalance(10)
        attachDeposit(3)
        voting.completePoll()

    })

    it('only owner can finalize voting', () => {
        VMContext.setSigner_account_id(CREATOR_ACCOUNT_ID)
        attachDeposit(2)
        expect((): void => { voting.completePoll() }).toThrow('Only the owner of this contract may call this method')
    })
})
