import { DateTime } from "luxon";

export interface ITask {
  title: string;
  lastExecuted: DateTime;
  lastChecked: DateTime;
}
