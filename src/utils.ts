import { u128, Context, ContractPromise } from "near-sdk-as";

export type AccountId = string;

export type Gas = u64;

export type Amount = u128;

export type Balance = Amount;

export type Money = Amount;

export type Timestamp = u64;

export const ONE_NEAR = u128.from("1000000000000000000000000");
export const XCC_GAS: Gas = 20_000_000_000_000;
export const MIN_ACCOUNT_BALANCE: u128 = u128.mul(ONE_NEAR, u128.from(3));

export function asNEAR(amount: u128): string {
  return u128.div(amount, ONE_NEAR).toString();
}

export function toYocto(amount: number): u128 {
  return u128.mul(ONE_NEAR, u128.from(amount))
}

export function assertSelf(): void {
  const caller = Context.predecessor
  const self = Context.contractName
  assert(caller == self, "Itself?");
}

export function assertSingleSuccess(): void {
  const x = ContractPromise.getResults()
  assert(x.length == 1, "Expected one result")
  assert(x[0].succeeded, "Expected one Successful")
}
