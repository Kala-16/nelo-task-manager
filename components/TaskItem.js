import React, { useState } from 'react';

export default function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editDueDate, setEditDueDate] = useState(task.dueDate);

  const priorityColors = {
    Low: 'bg-green-200 text-green-700',
    Medium: 'bg-yellow-200 text-yellow-700',
    High: 'bg-red-200 text-red-700',
  };

  const handleSave = () => {
    onEdit({
      ...task,
      title: editTitle,
      description: editDescription,
      priority: editPriority,
      dueDate: editDueDate,
    });
    setIsEditing(false);
    setIsExpanded(false);
  };

  return (
    <div className="border rounded-lg p-6 mb-4 bg-white shadow transition-shadow hover:shadow-xl">
      {/* Brief top info */}
      <div className="flex justify-between items-center mb-1">
        <div>
          <h3 className="text-xl font-semibold">{task.title}</h3>
          <div className="text-sm text-gray-600 mt-2">Due: {task.dueDate || 'No due date'}</div>
        </div>
        <span className={`px-3 py-1 rounded text-sm font-semibold ${priorityColors[task.priority]}`}>{task.priority}</span>
      </div>

      {/* Expand/collapse button */}
      {!isExpanded && !isEditing && (
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 font-semibold"
            onClick={() => setIsExpanded(true)}
          >
            View Details
          </button>
        </div>
      )}

      {/* Expanded Details or Edit Form */}
      {(isExpanded || isEditing) && (
        <div className="mt-6">
          {isEditing ? (
            <form className="bg-gray-50 rounded-lg p-4 space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              {/* Title */}
              <div>
                <label htmlFor="editTitle" className="block text-gray-700 font-medium mb-1">Title</label>
                <input
                  id="editTitle"
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Task Title"
                  className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              {/* Description */}
              <div>
                <label htmlFor="editDescription" className="block text-gray-700 font-medium mb-1">Description</label>
                <textarea
                  id="editDescription"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Task Description"
                  className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={3}
                />
              </div>
              {/* Priority */}
              <div>
                <label htmlFor="editPriority" className="block text-gray-700 font-medium mb-1">Priority</label>
                <select
                  id="editPriority"
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select Priority</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              {/* Due Date */}
              <div>
                <label htmlFor="editDueDate" className="block text-gray-700 font-medium mb-1">Due Date</label>
                <input
                  id="editDueDate"
                  type="date"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {/* Save/Cancel */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="mb-3 text-gray-700">
                <span className="font-semibold">Description:</span>
                <span className="ml-2">{task.description || 'No description'}</span>
              </div>
              <div className="mb-3 text-gray-700">
                <span className="font-semibold">Status:</span>
                <span className={`ml-2 font-bold ${task.completed ? 'text-green-600' : 'text-red-600'}`}>
                  {task.completed ? 'Completed' : 'Pending'}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 mb-5">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 font-semibold"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-semibold"
                  onClick={() => onDelete(task.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-semibold"
                  onClick={() => onToggleComplete(task.id)}
                >
                  {task.completed ? 'Mark Pending' : 'Mark Complete'}
                </button>
              </div>
              <div className="mt-2">
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 font-semibold w-full"
                  onClick={() => setIsExpanded(false)}
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
