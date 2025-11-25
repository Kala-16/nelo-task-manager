import React, { useState } from "react";
import { Task } from "../../types";

export default function TaskItem({ task, onEdit, onDelete, onToggle }: { task: Task; onEdit: (id: string, p: Partial<Task>) => void; onDelete: (id: string) => void; onToggle: (id: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description ?? "");
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate ?? "");

  function save() {
    if (!title.trim()) return;
    onEdit(task.id, { title: title.trim(), description: desc.trim(), priority, dueDate: dueDate || undefined });
    setEditing(false);
  }

  return (
    <div className="border p-3 rounded flex justify-between items-start">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
          {editing ? (
            <input value={title} onChange={e => setTitle(e.target.value)} className="font-semibold border-b" />
          ) : (
            <div className={`font-semibold ${task.completed ? "line-through text-gray-500" : ""}`}>{task.title}</div>
          )}
          <span className={`ml-2 text-xs px-2 py-1 rounded ${task.priority === "High" ? "bg-red-200" : task.priority === "Medium" ? "bg-yellow-200" : "bg-green-200"}`}>{task.priority}</span>
        </div>
        <div className="text-sm text-gray-600 mt-1">
          {editing ? (
            <textarea value={desc} onChange={e => setDesc(e.target.value)} className="w-full border p-1 rounded" />
          ) : (
            task.description
          )}
        </div>
        <div className="text-xs text-gray-500 mt-1">Due: {task.dueDate ?? "N/A"}</div>
      </div>

      <div className="flex flex-col items-end ml-4 gap-2">
        {editing ? (
          <>
            <select value={priority} onChange={e => setPriority(e.target.value as any)} className="border p-1 rounded text-sm">
              <option>Low</option><option>Medium</option><option>High</option>
            </select>
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="border p-1 rounded text-sm" />
            <div className="flex gap-2">
              <button onClick={save} className="bg-green-600 text-white px-3 py-1 rounded text-sm">Save</button>
              <button onClick={() => setEditing(false)} className="bg-gray-300 px-3 py-1 rounded text-sm">Cancel</button>
            </div>
          </>
        ) : (
          <>
            <button onClick={() => setEditing(true)} className="bg-indigo-600 text-white px-3 py-1 rounded text-sm">Edit</button>
            <button onClick={() => { if (confirm("Delete this task?")) onDelete(task.id); }} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
          </>
        )}
      </div>
    </div>
  );
}