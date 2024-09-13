import { ITask, TaskStatus } from "@/data/task";
import { toRelative } from "@/utils/dates";
import clsx from "clsx";

function rowColor(status: TaskStatus): string {
  switch (status) {
    case TaskStatus.Due:
      return "even:from-sky-200 even:to-indigo-200 odd:from-sky-100 odd:to-indigo-100";
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

export default function Task({ task }: { task: ITask }) {
  return (
    <div
      className={clsx(
        "bg-gradient-to-tr",
        rowColor(task.status),
        "w-full h-16 px-2",
        "flex flex-row items-center"
      )}
    >
      <div className="text-2xl flex-none px-2">⬜</div>
      <div className="flex flex-col w-0 flex-1">
        <div className="font-bold truncate">{task.title}</div>
        <div className="text-xs text-slate-600">
          <div className="text-slate-600"></div>
        </div>
      </div>
    </div>
  );
}
