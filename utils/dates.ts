import { CalendarDate } from "@/data/calendar-date";

export function toRelative(
  date: CalendarDate | undefined,
  today: CalendarDate
) {
  if (!date) {
    return "nooit";
  }

  const days = date.diff(today);

  // Custom values for close dates.
  switch (days) {
    case -2:
      return "eergisteren";
    case -1:
      return "gisteren";
    case 0:
      return "vandaag";
    case 1:
      return "morgen";
    case 2:
      return "overmorgen";
  }

  const future = days > 0;

  if (Math.abs(days) < 7) {
    return `${future ? "komende" : "afgelopen"} ${date.dayOfWeek}`;
  }

  return future ? `over ${days} ` : `${-days} dagen geleden`;
}
