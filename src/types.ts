export type Priority = "Low" | "Medium" | "High";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: string; // ISO
  completed: boolean;
  createdAt: string;
}