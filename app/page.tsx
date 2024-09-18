"use client";
import { tasks } from "@/data/demo";
import Task from "./task";
import { DateTime } from "luxon";
import { useState } from "react";
import { CalendarDate } from "@/data/calendar-date";

export default function Page() {
  const [fakeDay, setFakeDay] = useState(new CalendarDate(DateTime.now()));
  return (
    <main>
      <div
        onClick={() => setFakeDay((x) => x.next())}
        className="bg-slate-200 h-24 w-full flex content-center items-center"
      >
        Het is vandaag {fakeDay.dayOfWeek}.
      </div>
      {tasks.map((t, i) => (
        <Task task={t} key={i} today={fakeDay} />
      ))}
    </main>
  );
}
