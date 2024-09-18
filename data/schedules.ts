import { CalendarDate } from "./calendar-date";

export interface ISchedule {
  toString(): string;
  getNext(today: CalendarDate): CalendarDate | undefined;
}

export class NeverSchedule implements ISchedule {
  toString() {
    return "eenmalig";
  }

  getNext() {
    return undefined;
  }
}

export class IntervalSchedule implements ISchedule {
  constructor(public readonly n: number) {
    if (n < 1) {
      throw new Error("At least one day interval is required.");
    }
    if (Math.ceil(n) !== n) {
      throw new Error("Integer amount is required.");
    }
  }

  toString() {
    switch (this.n) {
      case 1:
        return "dagelijks";
      case 7:
        return "wekelijks";
      default:
        return `iedere ${this.n} dagen`;
    }
  }

  getNext(today: CalendarDate) {
    return today.plus(this.n);
  }
}
