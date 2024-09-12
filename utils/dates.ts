import { DateTime, DurationLikeObject } from "luxon";

const skew: DurationLikeObject = { hours: 5 };

function toDate(dateTime: DateTime) {
  return dateTime
    .setLocale("nl-nl")
    .setZone("local", { keepLocalTime: true })
    .minus(skew)
    .startOf("day");
}

export const today = toDate(DateTime.now());

export function toRelative(dateTime: DateTime) {
  const date = toDate(dateTime);
  const days = date.diff(today, "days").days;
  if (Math.ceil(days) !== days) {
    throw new Error(
      `Rounding error: ${days} days between ${date.toISO()} and ${today.toISO()}`
    );
  }

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
    return `${future ? "komende" : "afgelopen"} ${date.toFormat("cccc")}`;
  }

  const weeks = Math.round(days / 7);
  return future ? `over ${weeks} weken` : `${-weeks} weken geleden`;
}
