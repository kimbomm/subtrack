export type BillingCycle = 'weekly' | 'monthly' | 'yearly';

export interface Subscription {
  id: string;
  name: string;
  amount: number; // 원 단위 정수
  cycle: BillingCycle;
  startDate: string; // 'YYYY-MM-DD'
}
