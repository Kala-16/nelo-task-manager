import React from 'react';

export default function FilterBar({ filters, setFilters, search, setSearch }) {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))} className="p-2 border rounded">
        <option value="ALL">All</option>
        <option value="COMPLETED">Completed</option>
        <option value="PENDING">Pending</option>
      </select>
      <select value={filters.priority} onChange={e => setFilters(f => ({ ...f, priority: e.target.value }))} className="p-2 border rounded">
        <option value="ALL">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks..." className="flex-grow p-2 border rounded" />
    </div>
  );
}
