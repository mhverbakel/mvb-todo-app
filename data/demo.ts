import { DateTime } from "luxon";
import { ITask } from "./task";

function d(days: number, hour?: number) {
  return DateTime.local()
    .plus({ days })
    .startOf("day")
    .plus({ hours: hour ?? Math.random() * 16 + 8 });
}

function t(days: number, title: string, hour?: number): ITask {
  const date = d(-days, hour);
  return {
    title,
    lastExecuted: date,
    lastChecked: date,
  };
}

export const tasks: ITask[] = [
  t(1, "aanrecht"),
  t(1, "vaatwasser"),
  t(4, "een naam van een taak die veel langer is dan dat je scherm lang is"),
  t(20, "oud papier"),
];
