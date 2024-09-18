import { DateTime } from "luxon";

const dayStartHour = 5;

export class CalendarDate {
  private readonly start: DateTime;
  constructor(private readonly input: DateTime) {
    this.start = input
      .setLocale("nl-NL")
      .setZone("Europe/Amsterdam", { keepLocalTime: true })
      .minus({ hours: input.hour < dayStartHour ? 1 : 0 })
      .startOf("day");
  }

  public diff(other: CalendarDate): number {
    return this.start.diff(other.start, ["days", "milliseconds"]).days;
  }

  public next() {
    return this.plus(1);
  }

  public plus(days: number) {
    return new CalendarDate(this.input.plus({ days }));
  }

  public get dayOfWeek(): string {
    return this.start.toFormat("cccc");
  }

  public valueOf() {
    return this.start.year * 366 + this.start.ordinal;
  }
}
