import type { BillingCycle } from './types';

export function toMonthlyCost(_sub: { amount: number; cycle: BillingCycle }): number {
  throw new Error('not implemented');
}
