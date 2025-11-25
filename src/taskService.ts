import { Task } from "../types";

const LS_KEY = "nelo_tasks_v1";

function read(): Task[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function write(tasks: Task[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(tasks));
}
export default {
  list(): Task[] { return read(); },
  create(payload: Omit<Task, "id" | "createdAt">) {
    const tasks = read();
    const t: Task = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...payload
    };
    tasks.unshift(t);
    write(tasks);
    return t;
  },
  update(id: string, patch: Partial<Task>) {
    const tasks = read();
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return null;
    tasks[idx] = { ...tasks[idx], ...patch };
    write(tasks);
    return tasks[idx];
  },
  remove(id: string) {
    const tasks = read().filter(t => t.id !== id);
    write(tasks);
  },
  clearAll() { write([]); }
};