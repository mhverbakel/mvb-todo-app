import { tasks } from "@/data/demo";
import Task from "./task";

export default function Page() {
  return (
    <main>
      {tasks.map((t) => (
        <Task task={t} />
      ))}
    </main>
  );
}
