import { floorTo, roundTo } from "./";

export function remainingTimeToWords(remainingTime: number): string {
  const millisecondsInSecond = 1000;
  const millisecondsInMinute = 60 * millisecondsInSecond;
  const millisecondsInHour = 60 * millisecondsInMinute;
  const millisecondsInDay = 24 * millisecondsInHour;

  const days = floorTo(remainingTime / millisecondsInDay, 0);
  const hours = floorTo((remainingTime - days * millisecondsInDay) / millisecondsInHour, 0);
  const mins = floorTo(
    (remainingTime - days * millisecondsInDay - hours * millisecondsInHour) / millisecondsInMinute,
    0
  );

  if (days === 0 && hours === 0 && hours === 0) {
    return `${mins} دقیقه`;
  }

  if (days === 0 && hours >= 1) {
    return `${hours} ساعت${mins > 0 ? ` و ${mins} دقیقه` : ""}`;
  }

  if (days < 10) {
    return `${days} روز${hours > 0 ? ` و ${hours} ساعت` : ""}`;
  }

  if (days >= 10) {
    return `${days + 1} روز`;
  }

  return "0 ثانیه";
}

export function getRemainingDays(expiryTime: number): number {
  const remainingTime = expiryTime - new Date().getTime();
  const millisecondsInDay = 24 * 60 * 60 * 1000;

  return roundTo(remainingTime / millisecondsInDay, 0);
}

export default function isValidDate(d: Date): boolean {
  return d instanceof Date && !Number.isNaN(d.getTime());
}

export const timeSince = (date: Date): string | undefined => {
  if (!isValidDate(date)) return undefined;
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return `${Math.floor(interval)} سال قبل`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)} ماه قبل`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)} روز قبل`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} ساعت قبل`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} دقیقه قبل`;
  }
  return `${seconds < 0 || seconds === 0 ? "چند" : Math.floor(seconds)} ثانیه  قبل`;
};

export function isRecentlyConnected(date: Date) {
  const diffMs = Math.abs(new Date().getTime() - date.getTime());

  // Check if the difference is less than 1.5 minutes (1.5 * 60 * 1000 milliseconds)
  const isWithinWindow = diffMs < 1.5 * 60 * 1000;

  return isWithinWindow;
}
