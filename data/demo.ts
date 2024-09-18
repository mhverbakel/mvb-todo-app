import { DateTime } from "luxon";
import { ITask } from "./task";
import { IntervalSchedule } from "./schedules";
import { CalendarDate } from "./calendar-date";

function d(days: number, hour?: number) {
  return new CalendarDate(
    DateTime.local({ zone: "Europe/Amsterdam" })
      .plus({ days })
      .startOf("day")
      .plus({ hours: hour ?? Math.random() * 16 + 8 })
  );
}

function interval(title: string, days = 1): ITask {
  return {
    title,
    dueDate: d(0),
    schedule: new IntervalSchedule(days),
  };
}

export const tasks: ITask[] = [
  interval("❄ eten uithalen"),
  interval("📮 brievenbus", 3),
  interval("🔑 garagedeur"),
  interval(
    "🌟 een naam van een taak die veel langer is dan dat je scherm lang is"
  ),
  interval("📦 oud papier", 30),
];
