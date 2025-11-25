import React, { useState } from "react";
import { Priority } from "../../types";

export default function TaskForm({ onCreate }: { onCreate: (p: { title: string; description?: string; priority: Priority; dueDate?: string; completed: boolean }) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [dueDate, setDueDate] = useState("");
  const [err, setErr] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!title.trim()) { setErr("Title is required"); return; }
    onCreate({ title: title.trim(), description: description.trim(), priority, dueDate: dueDate || undefined, completed: false });
    // clear form
    setTitle(""); setDesc(""); setPriority("Medium"); setDueDate("");
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <h3 className="font-semibold">Add Task</h3>
      {err && <div className="text-sm text-red-600">{err}</div>}
      <input value={title} onChange={e => setTitle(e.target.value)} className="w-full border p-2 rounded" placeholder="Title" />
      <textarea value={description} onChange={e => setDesc(e.target.value)} className="w-full border p-2 rounded" placeholder="Description (optional)"></textarea>
      <div className="flex gap-2">
        <select value={priority} onChange={e => setPriority(e.target.value as Priority)} className="border p-2 rounded">
          <option>Low</option><option>Medium</option><option>High</option>
        </select>
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="border p-2 rounded" />
      </div>
      <button className="bg-indigo-600 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
}