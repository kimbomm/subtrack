import dayjs from 'dayjs';
import { nextBillingDate } from './billingDate';
import type { Subscription } from './types';

// 다음 결제일까지 남은 일수. 오늘은 호출하는 쪽에서 받는다
export function daysUntilNextBilling(sub: Subscription, today: string): number {
  const next = nextBillingDate(sub.startDate, sub.cycle, today);
  return dayjs(next).diff(dayjs(today), 'day');
}
