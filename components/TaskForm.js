import React, { useState } from 'react';

export default function TaskForm({ onAdd, defaultValue }) {
  const [title, setTitle] = useState(defaultValue?.title ?? '');
  const [description, setDescription] = useState(defaultValue?.description ?? '');
  const [priority, setPriority] = useState(defaultValue?.priority ?? 'Medium');
  const [dueDate, setDueDate] = useState(defaultValue?.dueDate ?? '');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!title || !priority || !dueDate) {
      setError('Title, Priority, and Due Date are required.');
      return;
    }
    setError('');
    onAdd({ title, description, priority, dueDate, completed: defaultValue?.completed ?? false });
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded shadow">
      {error && <div className="mb-3 text-red-600">{error}</div>}
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full mb-2 p-2 border rounded" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="w-full mb-2 p-2 border rounded" />
      <select value={priority} onChange={e => setPriority(e.target.value)} className="w-full mb-2 p-2 border rounded">
        <option>Low</option><option>Medium</option><option>High</option>
      </select>
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full mb-2 p-2 border rounded" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">Save Task</button>
    </form>
  );
}
