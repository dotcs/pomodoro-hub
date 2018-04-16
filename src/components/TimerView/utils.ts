import { differenceInSeconds, format, addMinutes } from "date-fns";

const SESSION_MINUTES = 25;

export function calculateTimeLeft(startTime: string): string {
  const targetTime = addMinutes(startTime, SESSION_MINUTES);
  const now = new Date();
  const diffInSeconds = differenceInSeconds(targetTime, now);
  const timeLeft = format(new Date(0, 0, 0, 0, 0, diffInSeconds), "mm:ss");
  return timeLeft;
}

export function calculateTimeLeftNumber(startTime: string): number {
  const targetTime = addMinutes(startTime, SESSION_MINUTES);
  const now = new Date();
  const diffInSeconds = differenceInSeconds(targetTime, now);
  return Math.max(diffInSeconds / (SESSION_MINUTES * 60), 0);
}
