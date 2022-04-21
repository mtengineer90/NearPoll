import { Context, u128 } from "near-sdk-as";
import { AccountId } from "../../utils";
import {PersistentUnorderedMap, PersistentVector} from "near-sdk-core";


@nearBindgen
export class Registrant {
  public static max_length(): i32 { return 100 as i32 };
  public creator: AccountId
  public contributions: u128 = u128.Zero
  constructor(
      public description: string
  ) {
    this.creator = Context.sender
  }
  addContribution(value: u128): void {
    this.contributions = u128.add(this.contributions, value);
  };

}

@nearBindgen
export class Vote {
  public voter: AccountId
  public contribution: u128 = u128.Zero
  constructor(contribution: u128) {
    this.voter = Context.sender
    this.contribution = contribution
  }

}

export const registrants: PersistentVector<Registrant> = new PersistentVector<Registrant>('i')

export const votes: PersistentUnorderedMap<i32, Vote[]> = new PersistentUnorderedMap<i32, Vote[]>('v')
