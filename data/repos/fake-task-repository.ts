// 📦 Oud papier aan de straat
// ♻ Groen container aan de weg
// ♻ Groen container binnen halen
// ♻ PMD

// 🍲 brokjes Knuf uitvullen
// 🍓 smoothie maken
// 👨 Polar spray
// 👱🏻‍♀️ Geld in envelopje
// 💉 Adalimumab uit de koelkast
// 💩 kattenbak verschonen
// 🛏 bed verschonen
// 🛏 hoeslaken
// 🙀 bakjes schoonmaken
// brievenbus legen
// 🚽 wc handdoek vervangen
// fris bijvullen
// 🧹 stofzuiger leegmaken
// 🧺 theedoek en handdoek vervangen
// 🧻 WC papier aanvullen
// 🪟 raam zolder sluiten
// 🪴 kamerplanten
// 🫖 Theezakjeszakjes weggooien

import { DateTime, Duration } from "luxon";
import { CalendarDate } from "../calendar-date";
import { ITask, ITaskEvent, ITaskRepository } from "../interfaces";

class FakeTask {
  private dueDate = this.repos.today;
  private checked: CalendarDate | null = null;
  private executed: { at: CalendarDate; due: CalendarDate }[] = [];

  constructor(
    private readonly repos: FakeTaskRepository,
    public readonly title: string
  ) {}

  public toDTO: () => ITask = () => ({
    title: this.title,
    checked: +(this.checked ?? 0) === +this.repos.today,
    snoozed: false,
    dueDate: this.dueDate,
    dueDelta: this.dueDate.diff(this.repos.today),
    lastExecuted: this.executed[this.executed.length - 1]?.at ?? null,
    isUpdating: false,
    complete: (executed: boolean) => {
      if (executed) {
        this.executed.push({
          at: this.repos.today,
          due: this.dueDate,
        });
      }
      this.dueDate = this.repos.today.next();
    },
    uncomplete: () => {
      const execution = this.executed.pop()!;
      this.dueDate = execution.due;
    },
    snooze(duration: Duration<boolean> | null): void {
      throw new Error("Method not implemented.");
    },
  });
}

export class FakeTaskRepository implements ITaskRepository {
  private readonly listeners: Array<(event: ITaskEvent) => void> = [];
  public today = new CalendarDate(DateTime.now());
  private tasks: readonly FakeTask[] = [
    "☑️ aanrecht schoonmaken",
    "✨ bartafels opruimen",
    "✨ kantoor opruimen",
    "✨ slaapkamer opruimen",
    "❄ eten uithalen",
    "⬛ salontafel leeg maken",
    "⬛ keukentafel opruimen",
    "🍖 kattenvoer + water controleren",
    "🐈 kattenbak leeg scheppen",
    "💦 vaatwasser aanzetten",
    "🔑 achterdeur controleren",
    "🔑 garagedeur controleren",
    "🔑 schuifpui controleren",
    "🔑 voordeur controleren",
    "🚗 autosleutels in de la",
    "🚰 wasbak droog maken",
    "🛋 dekens en kussens",
    "🧺 vaatdoek vervangen",
  ].map((title) => new FakeTask(this, title));

  subscribe(fn: (event: ITaskEvent) => void): () => void {
    this.listeners.push(fn);
    this.update();
    return () => this.listeners.splice(this.listeners.indexOf(fn), 1);
  }

  refresh(): void {
    // Dummy implementation, moves to the next day.
    this.today = this.today.next();
    this.update();
  }

  update() {
    const event: ITaskEvent = {
      tasks: this.tasks.map((x) => x.toDTO()),
      refreshing: true,
      lastRefresh: DateTime.now(),
      today: this.today,
    };

    this.listeners.forEach((x) => x(event));
  }
}
