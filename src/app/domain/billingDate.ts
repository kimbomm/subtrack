import dayjs from 'dayjs';

const dateFormat = 'YYYY-MM-DD';
export function nextBillingDate(startDate: string, today: string): string {
  // 오늘이 시작일 이전이면 시작일을 보내준다.
  if (dayjs(today).isBefore(dayjs(startDate))) {
    return dayjs(startDate).format(dateFormat);
  }

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
function getDate(value: string): number {
  return dayjs(value).get('date');
}
function getDaysInMonth(value: string): number {
  return dayjs(value).daysInMonth();
}

function getIsExistDateInMonth(value: string, date: number): boolean {
  const YYYY = dayjs(value).get('year');
  const MM = dayjs(value).get('month') + 1;
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
