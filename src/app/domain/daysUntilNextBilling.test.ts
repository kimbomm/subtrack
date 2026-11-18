import { describe, expect, it } from 'vitest';
import { daysUntilNextBilling } from './daysUntilNextBilling';
import type { Subscription } from './types';

describe('daysUntilNextBilling', () => {
  it('월간 구독의 다음 결제일까지 남은 일수', () => {
    const sub: Subscription = {
      id: '1',
      name: '넷플릭스',
      amount: 17000,
      cycle: 'monthly',
      startDate: '2026-11-05',
    };
    expect(daysUntilNextBilling(sub, '2026-11-17')).toBe(18);
  });

  it('주간 구독의 다음 결제일까지 남은 일수', () => {
    const sub: Subscription = {
      id: '2',
      name: '주간 뉴스레터',
      amount: 1000,
      cycle: 'weekly',
      startDate: '2026-11-04',
    };
    expect(daysUntilNextBilling(sub, '2026-11-17')).toBe(1);
  });

  it('연간 구독의 다음 결제일까지 남은 일수', () => {
    const sub: Subscription = {
      id: '3',
      name: '클라우드 저장소',
      amount: 99000,
      cycle: 'yearly',
      startDate: '2026-01-01',
    };
    expect(daysUntilNextBilling(sub, '2026-11-17')).toBe(45);
  });
});
