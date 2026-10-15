import type { BillingCycle } from './types';

export function toMonthlyCost(_sub: { amount: number; cycle: BillingCycle }): number {
  if (_sub.amount === 0) return 0;

  switch (_sub.cycle) {
    case 'weekly':
      return (_sub.amount * 52) / 12;
    case 'monthly':
      return _sub.amount;
    case 'yearly':
      return _sub.amount / 12;
  }
}
