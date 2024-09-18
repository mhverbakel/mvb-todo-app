"use client";
import { CalendarDate } from "@/data/calendar-date";
import { ITask } from "@/data/task";
import { toRelative } from "@/utils/dates";
import clsx from "clsx";
import { DateTime } from "luxon";
import { useCallback, useState } from "react";

enum TaskStatus {
  Due,
  Overdue,
  Future,
  Executed,
  Skipped,
  Snoozed,
}

function determineStatus(task: ITask, today: CalendarDate) {
  if (!task.dueDate) {
    return TaskStatus.Future;
  }
  if (task.snoozedUntil && task.snoozedUntil > DateTime.now()) {
    return new CalendarDate(task.snoozedUntil) > task.dueDate
      ? TaskStatus.Skipped
      : TaskStatus.Snoozed;
  }
  if (+today === +(task.lastExecuted ?? 0)) {
    return TaskStatus.Executed;
  }
  if (+today === +task.dueDate) {
    return TaskStatus.Due;
  }
  if (task.dueDate < today) {
    return TaskStatus.Overdue;
  }
  return TaskStatus.Future;
}

function rowColor(status: TaskStatus): string {
  switch (status) {
    case TaskStatus.Due:
      return "even:from-sky-50 even:to-indigo-50 odd:from-sky-100 odd:to-indigo-100";
    case TaskStatus.Overdue:
      return "even:from-pink-200 even:to-rose-200 odd:from-pink-100 odd:to-rose-100";
    case TaskStatus.Future:
      return "even:from-slate-200 even:to-zinc-200 odd:from-slate-100 odd:to-zinc-100";
    case TaskStatus.Executed:
    case TaskStatus.Skipped:
    case TaskStatus.Snoozed:
      return "even:from-green-200 even:to-emerald-200 odd:from-green-100 odd:to-green-100";
  }
}

function dateColor(status: TaskStatus): string {
  switch (status) {
    case TaskStatus.Overdue:
      return "text-red-700";
    case TaskStatus.Due:
      return "text-sky-600";
    default:
      return "text-slate-600";
  }
}

function icon(status: TaskStatus): string {
  switch (status) {
    case TaskStatus.Due:
    case TaskStatus.Overdue:
      return "⬜";
    case TaskStatus.Future:
      return "▫️";
    case TaskStatus.Executed:
      return "✅";
    case TaskStatus.Skipped:
      return "⏭️";
    case TaskStatus.Snoozed:
      return "⏰";
  }
}

export default function ({
  task,
  today,
}: {
  task: ITask;
  today: CalendarDate;
}) {
  const [_, refresh] = useState({});
  const status = determineStatus(task, today);
  const check = useCallback(() => {
    task.lastExecuted = today;
    task.dueDate = task.schedule.getNext(today);
    refresh({});
  }, [task, today]);
  return (
    <div
      className={clsx(
        "bg-gradient-to-tr",
        rowColor(status),
        "w-full h-16 px-2",
        "flex flex-row items-center"
      )}
    >
      <div className="text-2xl flex-none px-2" onClick={check}>
        {icon(status)}
      </div>
      <div className="flex flex-col w-0 flex-1">
        <div className="font-bold truncate">{task.title}</div>
        <div className="text-xs">
          <span className="text-slate-600">
            {toRelative(task.lastExecuted, today)} |
          </span>{" "}
          <span className={dateColor(status)}>
            {toRelative(task.dueDate, today)}
          </span>
        </div>
      </div>
    </div>
  );
}
