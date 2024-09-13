import { DateTime } from "luxon";
import { ITask, TaskStatus } from "./task";

function d(days: number, hour?: number) {
  return DateTime.local()
    .plus({ days })
    .startOf("day")
    .plus({ hours: hour ?? Math.random() * 16 + 8 });
}

function t(
  days: number,
  title: string,
  status: TaskStatus = TaskStatus.Due
): ITask {
  const date = d(-days);
  return {
    title,
    lastExecuted: date,
    status,
  };
}

export const tasks: ITask[] = [
  t(1, "❄ eten uithalen"),
  t(5, "📮 brievenbus", TaskStatus.Overdue),
  t(1, "🔑 garagedeur"),
  t(4, "🌟 een naam van een taak die veel langer is dan dat je scherm lang is"),
  t(-20, "📦 oud papier", TaskStatus.Future),
];
