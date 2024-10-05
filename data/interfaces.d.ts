import { CalendarDate } from "@/data/calendar-date";
import { DateTime, Duration } from "luxon";

/**
 * Interface defining the properties and methods on a task.
 */
export interface ITask {
  /**
   * The (human readable) title of the task.
   */
  readonly title: string;

  /**
   * A value indicating that the task was checked off for today.
   */
  readonly checked: boolean;

  /**
   * A value indicating that the task is snoozed.
   */
  readonly snoozed: boolean;

  /**
   * The date that it should be executed.
   */
  readonly dueDate: CalendarDate;

  /**
   * The amount of days until the task must be executed, or the (negative) amount of days since this should have been executed.
   */
  readonly dueDelta: number;

  /**
   * The date that this task has last been executed (or null if it was never executed before).
   */
  readonly lastExecuted: CalendarDate | null;

  /**
   * A value indicating that the current task is being updated.
   */
  readonly isUpdating: boolean;

  /**
   * Check the task for today.
   * @param executed A value indicating that the task was executed (opposed to only checking that it is not necessary).
   */
  complete(executed: boolean): void;

  /**
   * Uncheck the task for today.
   */
  uncomplete(): void;

  /**
   * Snooze the task.
   * @param duration The duration for which the task should be snoozed (or null if it should be snoozed until tomorrow).
   */
  snooze(duration: Duration | null): void;
}

/**
 * Interface representing the data that is available from the repository subscription.
 */
export interface ITaskEvent {
  /**
   * The collection of tasks. Ordered topologically (note: items that are due on top).
   */
  readonly tasks: readonly ITask[];

  /**
   * A value indicating that the information is currently being refreshed.
   */
  readonly refreshing: boolean;

  /**
   * The moment at which the data was last refreshed.
   */
  readonly lastRefresh: DateTime;

  /**
   * The current date.
   */
  readonly today: CalendarDate;
}

/**
 * Repository for retrieving information about tasks.
 */
export interface ITaskRepository {
  /**
   * Subscribe to updates in the repository.
   * @param fn The function that receives the updates.
   * @returns A function that clears the subscription when called.
   */
  subscribe(fn: (event: ITaskEvent) => void): () => void;

  /**
   * Request a refresh of the data as soon as possible.
   */
  refresh(): void;
}
