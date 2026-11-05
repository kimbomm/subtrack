import { describe, it, expect } from 'vitest';
import { nextBillingDate } from './billingDate';

describe('nextBillingDate', () => {
  it('이번 달 결제일이 지났다.', () => {
    expect(nextBillingDate('2026-01-05', 'monthly', '2026-01-10')).toBe('2026-02-05');
  });

  it('오늘이 결제일 당일이다', () => {
    expect(nextBillingDate('2026-01-05', 'monthly', '2026-01-05')).toBe('2026-02-05');
  });

  it('아직 가입일이 안 왔다', () => {
    expect(nextBillingDate('2026-01-05', 'monthly', '2026-01-02')).toBe('2026-01-05');
  });

  it('가입하고 몇 달이 지났다', () => {
    expect(nextBillingDate('2026-01-05', 'monthly', '2026-05-20')).toBe('2026-06-05');
  });

  it('다음 결제일이 다음 해로 넘어간다', () => {
    expect(nextBillingDate('2026-01-05', 'monthly', '2026-12-20')).toBe('2027-01-05');
  });

  it('몇 달 지나고 결제일이 하루 앞으로 다가왔다', () => {
    expect(nextBillingDate('2026-01-05', 'monthly', '2026-11-04')).toBe('2026-11-05');
  });

  it('몇 달 지나고 결제일이 도래했다', () => {
    expect(nextBillingDate('2026-01-05', 'monthly', '2026-11-05')).toBe('2026-12-05');
  });

  it('결제일이 다른 달의 미래이면 결제일을 돌려준다', () => {
    expect(nextBillingDate('2026-03-05', 'monthly', '2026-01-02')).toBe('2026-03-05');
  });

  it('31일 가입, 평년 2월', () => {
    expect(nextBillingDate('2027-01-31', 'monthly', '2027-02-10')).toBe('2027-02-28');
  });

  it('31일 가입, 윤년 2월', () => {
    expect(nextBillingDate('2028-01-31', 'monthly', '2028-02-10')).toBe('2028-02-29');
  });

  it('2월 결제가 끝난 뒤 → 3월은 다시 31일 (밀림 방지)', () => {
    expect(nextBillingDate('2027-01-31', 'monthly', '2027-02-28')).toBe('2027-03-31');
  });

  it('31일 가입, 30일까지 있는 달', () => {
    expect(nextBillingDate('2027-01-31', 'monthly', '2027-04-10')).toBe('2027-04-30');
  });

  it('말일이 결제일 당일이다 (예: 2월 결제일 당일)', () => {
    expect(nextBillingDate('2028-01-31', 'monthly', '2028-02-29')).toBe('2028-03-31');
  });

  it('31일이 아닌 날 가입인데 2월에 보정됨 (예: 30일 가입)', () => {
    expect(nextBillingDate('2026-11-30', 'monthly', '2027-01-30')).toBe('2027-02-28');
  });

  it('이번달이 결제일, 다음달이 짧은 경우', () => {
    expect(nextBillingDate('2026-11-30', 'monthly', '2027-03-05')).toBe('2027-03-30');
  });

  // cycle 추가 테스트
  it('yearly) 가입 후 몇 달 지남', () => {
    expect(nextBillingDate('2026-11-03', 'yearly', '2027-01-01')).toBe('2027-11-03');
  });

  it('yearly) 오늘이 결제일 당일', () => {
    expect(nextBillingDate('2026-11-03', 'yearly', '2027-11-03')).toBe('2028-11-03');
  });

  it('yearly) 2/29 가입, 다음 해(평년)', () => {
    expect(nextBillingDate('2028-02-29', 'yearly', '2029-02-28')).toBe('2030-02-28');
  });

  it('yearly) 버그재현 2/29 가입,(윤년)', () => {
    expect(nextBillingDate('2028-02-29', 'yearly', '2031-03-01')).toBe('2032-02-29');
  });

  it('yearly) 버그재현2 2/28 가입, 다음 해(윤년)', () => {
    expect(nextBillingDate('2027-02-28', 'yearly', '2028-01-10')).toBe('2028-02-28');
  });

  it('yearly) 2/29 가입, 4년 뒤(윤년)에는 다시 2/29', () => {
    expect(nextBillingDate('2028-02-29', 'yearly', '2032-02-01')).toBe('2032-02-29');
  });

  it('weekly) 가입 후 며칠 지남 (첫 결제 전)', () => {
    expect(nextBillingDate('2026-11-03', 'weekly', '2026-11-05')).toBe('2026-11-10');
  });

  it('weekly) 오늘이 결제일 당일', () => {
    expect(nextBillingDate('2026-11-03', 'weekly', '2026-11-10')).toBe('2026-11-17');
  });

  it('weekly) 결제일이 월을 넘어감', () => {
    expect(nextBillingDate('2026-10-29', 'weekly', '2026-11-01')).toBe('2026-11-05');
  });

  it('weekly) 결제일이 해를 넘어감', () => {
    expect(nextBillingDate('2026-12-29', 'weekly', '2027-01-01')).toBe('2027-01-05');
  });

  it('weekly) 가입 후 5주 이상 지남', () => {
    expect(nextBillingDate('2026-12-29', 'weekly', '2027-02-04')).toBe('2027-02-09');
  });
});
