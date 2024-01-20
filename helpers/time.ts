import { floorTo, roundTo } from "./"

export function remainingTimeToWords(remainingTime: number): string {
  const millisecondsInSecond = 1000
  const millisecondsInMinute = 60 * millisecondsInSecond
  const millisecondsInHour = 60 * millisecondsInMinute
  const millisecondsInDay = 24 * millisecondsInHour

  const days = floorTo(remainingTime / millisecondsInDay, 0)
	const hours = floorTo((remainingTime - (days * millisecondsInDay)) / millisecondsInHour, 0);
  const mins = floorTo((remainingTime - (days * millisecondsInDay) - (hours * millisecondsInHour)) / millisecondsInMinute, 0);

  if (days > 10) {
    return `${days + 1} روز`
  }
	if (days < 10 && days >= 1) {
    return `${days} روز${hours > 0 ? ` و ${hours} ساعت` : ''}`;
  }
	if (days === 0 && hours >= 1) {
    return `${hours} ساعت${mins > 0 ? ` و ${mins} دقیقه` : ''}`;
  }
	if (hours === 0 && mins >= 1) {
    return `${mins} دقیقه`;
  }

  return "0 ثانیه"
}

export function getRemainingDays(expiryTime: number): number {
  const remainingTime = expiryTime - new Date().getTime();
  const millisecondsInDay = 24 * 60 * 60 * 1000;

  return roundTo(remainingTime / millisecondsInDay, 0);
}
