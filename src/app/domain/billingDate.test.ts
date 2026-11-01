import { describe, it, expect } from 'vitest';
import { nextBillingDate } from './billingDate';

describe('nextBillingDate', () => {
  it('이번 달 결제일이 지났다.', () => {
    expect(nextBillingDate('2026-01-05', '2026-01-10')).toBe('2026-02-05');
  });

  it('오늘이 결제일 당일이다', () => {
    expect(nextBillingDate('2026-01-05', '2026-01-05')).toBe('2026-02-05');
  });

  it('아직 가입일이 안 왔다', () => {
    expect(nextBillingDate('2026-01-05', '2026-01-02')).toBe('2026-01-05');
  });

  it('가입하고 몇 달이 지났다', () => {
    expect(nextBillingDate('2026-01-05', '2026-05-20')).toBe('2026-06-05');
  });

  it('다음 결제일이 다음 해로 넘어간다', () => {
    expect(nextBillingDate('2026-01-05', '2026-12-20')).toBe('2027-01-05');
  });

  it('몇 달 지나고 결제일이 하루 앞으로 다가왔다', () => {
    expect(nextBillingDate('2026-01-05', '2026-11-04')).toBe('2026-11-05');
  });

  it('몇 달 지나고 결제일이 도래했다', () => {
    expect(nextBillingDate('2026-01-05', '2026-11-05')).toBe('2026-12-05');
  });

  it('결제일이 다른 달의 미래이면 결제일을 돌려준다', () => {
    expect(nextBillingDate('2026-03-05', '2026-01-02')).toBe('2026-03-05');
  });
});
