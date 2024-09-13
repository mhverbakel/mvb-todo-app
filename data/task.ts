import { DateTime } from "luxon";

export interface ITask {
  title: string;
  lastExecuted: DateTime;
  status: TaskStatus;
}

export enum TaskStatus {
  Future,
  Due,
  Overdue,
  Executed,
  Skipped,
  Snoozed,
}
