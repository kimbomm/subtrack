import dayjs from 'dayjs';

export function nextBillingDate(startDate: string, today: string): string {
  const dateFormat = 'YYYY-MM-DD';

  // 오늘이 시작일 이전이면 시작일을 보내준다.
  if (dayjs(today).isBefore(dayjs(startDate))) {
    return dayjs(startDate).format(dateFormat);
  }

  // 오늘기준 년도와 월 + 시작일기준 일 값을 조합한다.
  const tdYear = dayjs(today).get('year');
  const tdMonth = dayjs(today).get('month') + 1;
  const tdDate = dayjs(today).get('date');

  const stDate = dayjs(startDate).get('date');

  // 오늘이 시작일 이전일 경우 1달을 더하지 않는다.
  if (Number(tdDate) < Number(stDate)) {
    return dayjs(`${tdYear}-${tdMonth}-${stDate}`).format(dateFormat);
  }

  return dayjs(`${tdYear}-${tdMonth}-${stDate}`).add(1, 'M').format(dateFormat);
}
