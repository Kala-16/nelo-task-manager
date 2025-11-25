import React from "react";
import { Task } from "../../types";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onEdit, onDelete, onToggle }:
  { tasks: Task[]; onEdit: (id: string, patch: Partial<Task>) => void; onDelete: (id: string) => void; onToggle: (id: string) => void }) {

  if (tasks.length === 0) return <div className="text-sm text-gray-600">No tasks found.</div>;

  return (
    <div className="space-y-3">
      {tasks.map(t => (
        <TaskItem key={t.id} task={t} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </div>
  );
}