import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { daysUntilNextBilling } from './daysUntilNextBilling';
import type { Subscription } from './types';

describe('daysUntilNextBilling', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('월간 구독의 다음 결제일까지 남은 일수', () => {
    vi.setSystemTime('2026-11-17');
    const sub: Subscription = {
      id: '1',
      name: '넷플릭스',
      amount: 17000,
      cycle: 'monthly',
      startDate: '2026-11-05',
    };
    expect(daysUntilNextBilling(sub)).toBe(18);
  });

  it('주간 구독은 7일 이내에 결제된다', () => {
    vi.setSystemTime('2026-11-17');
    const sub: Subscription = {
      id: '2',
      name: '주간 뉴스레터',
      amount: 1000,
      cycle: 'weekly',
      startDate: '2026-11-04',
    };
    expect(daysUntilNextBilling(sub)).toBe(1);
  });

  it('연간 구독의 다음 결제일까지 남은 일수', () => {
    vi.setSystemTime('2026-11-17');
    const sub: Subscription = {
      id: '3',
      name: '클라우드 저장소',
      amount: 99000,
      cycle: 'yearly',
      startDate: '2026-01-01',
    };
    expect(daysUntilNextBilling(sub)).toBe(45);
  });

  it('UTC 날짜가 하루 전인 새벽에도 한국 날짜로 계산한다', () => {
    vi.setSystemTime(new Date('2027-12-31 00:30:00'));
    const sub: Subscription = {
      id: '4',
      name: '클라우드 저장소',
      amount: 99000,
      cycle: 'yearly',
      startDate: '2026-01-01',
    };
    expect(daysUntilNextBilling(sub)).toBe(1);
  });
});
