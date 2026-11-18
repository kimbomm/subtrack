import dayjs from 'dayjs';
import { nextBillingDate } from './billingDate';
import type { Subscription } from './types';

// 다음 결제일까지 남은 일수. "오늘"은 함수 안에서 직접 구한다.
export function daysUntilNextBilling(sub: Subscription): number {
  const today = dayjs().format('YYYY-MM-DD');
  const next = nextBillingDate(sub.startDate, sub.cycle, today);
  return dayjs(next).diff(dayjs(today), 'day');
}
