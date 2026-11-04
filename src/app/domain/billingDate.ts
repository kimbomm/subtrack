import dayjs from 'dayjs';
import type { BillingCycle } from './types';

const dateFormat = 'YYYY-MM-DD';
export function nextBillingDate(startDate: string, cycle: BillingCycle, today: string): string {
  // 오늘이 시작일 이전이면 시작일을 보내준다.
  if (dayjs(today).isBefore(dayjs(startDate))) {
    return dayjs(startDate).format(dateFormat);
  }
  switch (cycle) {
    case 'yearly':
      // 가입 후 몇 달 지남
      // 오늘이 결제일 당일
      return getCalcYearlyBillingDate(startDate, today);
    default:
      const BL_DD = getDate(startDate);
      const billingDate = getCalcBillingDate(today, BL_DD);

      if (dayjs(today).isBefore(dayjs(billingDate))) {
        return billingDate;
      }

      const nextMonthBillingDate = getCalcBillingDate(
        dayjs(today).add(1, 'M').format(dateFormat),
        BL_DD,
      );
      return nextMonthBillingDate;
  }
}
function getYear(value: string): number {
  return dayjs(value).get('year');
}
function getMonth(value: string): number {
  return dayjs(value).get('month');
}
function getDate(value: string): number {
  return dayjs(value).get('date');
}
function getDaysInMonth(value: string): number {
  return dayjs(value).daysInMonth();
}

function getIsExistDateInMonth(value: string, date: number): boolean {
  const YYYY = getYear(value);
  const MM = getMonth(value) + 1;
  return date <= getDaysInMonth(`${YYYY}-${MM}`);
}

//결제일을 구한다
function getCalcBillingDate(value: string, targetDate: number): string {
  // 결제일이 존재하느냐
  if (getIsExistDateInMonth(value, targetDate)) {
    return dayjs(value).set('date', targetDate).format(dateFormat);
  }

  // 결제일이 존재하지 않느냐
  const maxDate = getDaysInMonth(value);
  return dayjs(value).set('date', maxDate).format(dateFormat);
}

function getCalcYearlyBillingDate(startDate: string, today: string): string {
  const TD_YY = getYear(today);
  const ST_MM = getMonth(startDate);
  const ST_DD = getDate(startDate);

  // today는 당해년도 결제일 이전인가?
  const TMP_CURDATE = dayjs(`${TD_YY}-${ST_MM + 1}-01`).format(dateFormat);
  const curYearBillingDate = getCalcBillingDate(TMP_CURDATE, ST_DD);
  if (dayjs(today).isBefore(curYearBillingDate)) {
    return curYearBillingDate;
  }
  // today보다 결제일 이후(당일포함)인가?
  const TMP_NEXTDATE = dayjs(curYearBillingDate)
    .set('year', TD_YY + 1)
    .format(dateFormat);
  return getCalcBillingDate(TMP_NEXTDATE, ST_DD);
}
