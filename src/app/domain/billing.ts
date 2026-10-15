import type { BillingCycle } from './types';

export function toMonthlyCost(sub: { amount: number; cycle: BillingCycle }): number {
  if (sub.amount === 0) return 0;

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
  if (sub.amount === 0) return 0;

  switch (sub.cycle) {
    case 'weekly':
      return sub.amount * 52;
    case 'monthly':
      return sub.amount * 12;
    case 'yearly':
      return sub.amount;
  }
}
