import React, { useState } from 'react';

const FilterBar = ({ onFilterChange, onSearchChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearchChange(value);
    };

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);
        onFilterChange(value);
    };

    return (
        <div className="flex justify-between items-center p-4 bg-gray-100 rounded">
            <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="border rounded p-2"
            />
            <select value={filter} onChange={handleFilterChange} className="border rounded p-2">
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="priority">Priority</option>
            </select>
        </div>
    );
};

export default FilterBar;