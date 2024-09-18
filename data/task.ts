import { DateTime } from "luxon";
import { CalendarDate } from "./calendar-date";
import { ISchedule } from "./schedules";

export interface ITask {
  title: string;
  lastExecuted?: CalendarDate;
  snoozedUntil?: DateTime;
  dueDate?: CalendarDate;
  schedule: ISchedule;
}
