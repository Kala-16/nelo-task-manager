import { Task } from "../types";

let cronId: number | null = null;
const INTERVAL_MS = 20 * 60 * 1000; // 20 minutes

function checkAndNotify(tasks: Task[]) {
  const pending = tasks.filter(t => !t.completed);
  if (pending.length === 0) {
    console.log("[Notify] No pending tasks.");
    return;
  }
  // Mock email: log summary of pending tasks
  console.log(`[Notify] Pending tasks (${pending.length}):`);
  pending.forEach(t => console.log(`- ${t.title} | due ${t.dueDate ?? "N/A"}`));
}

export function startNotificationCron(getTasks: () => Task[]) {
  if (cronId) return;
  cronId = window.setInterval(() => {
    try {
      checkAndNotify(getTasks());
    } catch (e) {
      console.error("Notification cron error", e);
    }
  }, INTERVAL_MS);
  // also run once immediately
  checkAndNotify(getTasks());
}

export function stopNotificationCron() {
  if (!cronId) return;
  clearInterval(cronId);
  cronId = null;
}