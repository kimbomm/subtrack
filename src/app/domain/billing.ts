import type { BillingCycle } from './types';
import { InvalidAmountError } from './errors';

export function toMonthlyCost(sub: { amount: number; cycle: BillingCycle }): number {
  assertValidAmount(sub.amount);

  switch (sub.cycle) {
    case 'weekly':
      return (sub.amount * 52) / 12;
    case 'monthly':
      return sub.amount;
    case 'yearly':
      return sub.amount / 12;
  }
}

export function toYearlyCost(sub: { amount: number; cycle: BillingCycle }): number {
  assertValidAmount(sub.amount);

  switch (sub.cycle) {
    case 'weekly':
      return sub.amount * 52;
    case 'monthly':
      return sub.amount * 12;
    case 'yearly':
      return sub.amount;
  }
}

export function roundWon(value: number): number {
  return Math.round(value);
}

export function assertValidAmount(amount: number): void {
  if (!Number.isFinite(amount) || amount < 0) {
    throw new InvalidAmountError(amount);
  }
}
