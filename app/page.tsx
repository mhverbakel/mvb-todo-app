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
        className="bg-slate-200 h-16 px-4 w-full flex flex-col content-center items-start justify-center"
      >
        <p>Het is vandaag {fakeDay.dayOfWeek}.</p>
        <small>Klik om te verversen...</small>
      </div>
      {tasks.map((t, i) => (
        <Task task={t} key={i} today={fakeDay} />
      ))}
    </main>
  );
}
