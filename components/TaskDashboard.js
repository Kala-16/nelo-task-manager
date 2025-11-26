// src/components/TaskDashboard.js
import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { useDebounce } from '../hooks/useDebouncedValue';

const centerStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column', // stack vertically
  alignItems: 'center',
  justifyContent: 'flex-start', // blocks start at top
  backgroundColor: '#f9fafb',
};

const cardStyle = {
  maxWidth: '600px',
  width: '100%',
  padding: '3rem 1.5rem',
  borderRadius: '1.5rem',
  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  background: '#fff',
  marginTop: '1rem',
  marginBottom: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export default function TaskDashboard({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState('');
  const [newDueDate, setNewDueDate] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleAddTask = () => setIsAdding(true);

  const handleSaveNewTask = (e) => {
    e.preventDefault();
    if (!newTitle || !newPriority) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTitle,
        description: newDescription,
        priority: newPriority,
        dueDate: newDueDate,
        completed: false,
      },
    ]);
    setNewTitle('');
    setNewDescription('');
    setNewPriority('');
    setNewDueDate('');
    setIsAdding(false);
  };

  const handleEditTask = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const handleDeleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const handleToggleComplete = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  // Filter tasks based on debounced search term, case-insensitive substring match
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
  );

  // Task Mail Automation (every 20 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      const pendingTasks = tasks.filter((task) => !task.completed);
      if (pendingTasks.length > 0) {
        console.log('Task Mail Automation - Pending Tasks:', pendingTasks);
        // Place email API call or mock here if needed
      }
    }, 1 * 60 * 1000);

    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <div style={centerStyle}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: '600px',
          marginTop: '2rem',
          marginBottom: '1rem',
        }}
      >
        <h2
          style={{
            fontSize: '2.2rem',
            fontWeight: 700,
            color: '#1e293b',
            margin: 0,
          }}
        >
          Task List
        </h2>
        <button
          onClick={onLogout}
          style={{
            backgroundColor: '#dc2626',
            color: 'white',
            padding: '0.5rem 1.5rem',
            borderRadius: '0.75rem',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          Logout
        </button>
      </div>

      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          maxWidth: '600px',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          border: '1px solid #d1d5db',
          marginBottom: '1rem',
          fontSize: '1rem',
          outline: 'none',
        }}
      />

      {filteredTasks.length === 0 && !isAdding && (
        <div
          style={{
            fontSize: '1.2rem',
            textAlign: 'center',
            color: '#64748b',
            fontWeight: 600,
            marginBottom: '1.5rem',
            maxWidth: '600px',
            width: '100%',
          }}
        >
          No matching tasks found
        </div>
      )}

      <div style={cardStyle}>
        {!isAdding && (
          <button
            style={{
              background: '#2563eb',
              color: 'white',
              padding: '0.75rem 2rem',
              borderRadius: '0.75rem',
              fontWeight: 600,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              marginBottom: filteredTasks.length === 0 ? '0' : '1rem',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={handleAddTask}
          >
            Add Task
          </button>
        )}

        {isAdding && (
          <form style={{ width: '100%', marginTop: 0 }} onSubmit={handleSaveNewTask}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                htmlFor="newTitle"
                style={{ display: 'block', color: '#334155', fontWeight: 500, marginBottom: '0.5rem' }}
              >
                Title
              </label>
              <input
                id="newTitle"
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Task Title"
                required
                style={{
                  border: '1px solid #d1d5db',
                  padding: '0.75rem',
                  width: '100%',
                  borderRadius: '0.5rem',
                  outline: 'none',
                  fontSize: '1rem',
                  marginBottom: 0,
                }}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                htmlFor="newDescription"
                style={{ display: 'block', color: '#334155', fontWeight: 500, marginBottom: '0.5rem' }}
              >
                Description
              </label>
              <textarea
                id="newDescription"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Task Description"
                rows={3}
                style={{
                  border: '1px solid #d1d5db',
                  padding: '0.75rem',
                  width: '100%',
                  borderRadius: '0.5rem',
                  outline: 'none',
                  fontSize: '1rem',
                  marginBottom: 0,
                }}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                htmlFor="newPriority"
                style={{ display: 'block', color: '#334155', fontWeight: 500, marginBottom: '0.5rem' }}
              >
                Priority
              </label>
              <select
                id="newPriority"
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
                required
                style={{
                  border: '1px solid #d1d5db',
                  padding: '0.75rem',
                  width: '100%',
                  borderRadius: '0.5rem',
                  outline: 'none',
                  fontSize: '1rem',
                  marginBottom: 0,
                }}
              >
                <option value="">Select Priority</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                htmlFor="newDueDate"
                style={{ display: 'block', color: '#334155', fontWeight: 500, marginBottom: '0.5rem' }}
              >
                Due Date
              </label>
              <input
                id="newDueDate"
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                style={{
                  border: '1px solid #d1d5db',
                  padding: '0.75rem',
                  width: '100%',
                  borderRadius: '0.5rem',
                  outline: 'none',
                  fontSize: '1rem',
                  marginBottom: 0,
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button
                type="submit"
                style={{
                  background: '#2563eb',
                  color: 'white',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '0.75rem',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Save Task
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                style={{
                  background: '#94a3b8',
                  color: 'white',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '0.75rem',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {!isAdding && filteredTasks.length > 0 && (
          <div style={{ width: '100%', marginTop: '1rem' }}>
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
