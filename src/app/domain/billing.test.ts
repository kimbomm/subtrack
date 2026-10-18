import { describe, it, expect, test } from 'vitest';
import { toMonthlyCost, toYearlyCost } from './billing';

describe('toMonthlyCost', () => {
  it('월간 구독은 금액 그대로 반환한다', () => {
    expect(toMonthlyCost({ amount: 10000, cycle: 'monthly' })).toBe(10000);
  });

  it('연간 구독은 12로 나눈 값을 반환한다', () => {
    expect(toMonthlyCost({ amount: 120000, cycle: 'yearly' })).toBe(10000);
  });

  it('주간 구독은 52/12를 곱한 값을 반환한다', () => {
    expect(toMonthlyCost({ amount: 1000, cycle: 'weekly' })).toBeCloseTo(4333.33, 2);
  });

  it('0원은 0을 반환한다', () => {
    expect(toMonthlyCost({ amount: 0, cycle: 'monthly' })).toBe(0);
  });

  it('금액이 큰 연간 구독도 정확하다', () => {
    expect(toMonthlyCost({ amount: 1_200_000, cycle: 'yearly' })).toBe(100000);
  });
});

describe('toYearlyCost', () => {
  it('월간 구독은 12를 곱한 값을 반환한다', () => {
    expect(toYearlyCost({ amount: 10000, cycle: 'monthly' })).toBe(120000);
  });

  it('주간 구독은 52를 곱한 값을 반환한다', () => {
    expect(toYearlyCost({ amount: 1000, cycle: 'weekly' })).toBe(52000);
  });

  it('연간 구독은 금액 그대로 반환한다', () => {
    expect(toYearlyCost({ amount: 120000, cycle: 'yearly' })).toBe(120000);
  });

  it('0원은 0을 반환한다', () => {
    expect(toYearlyCost({ amount: 0, cycle: 'weekly' })).toBe(0);
  });
});

describe('연 합계와 월 환산의 관계', () => {
  test.each(['weekly', 'monthly', 'yearly'] as const)(
    '%s 주기: 연 합계 ≈ 월 환산 × 12',
    (cycle) => {
      const sub = { amount: 5000, cycle };

      expect(toYearlyCost(sub)).toBeCloseTo(toMonthlyCost(sub) * 12, 6);
    },
  );
});
