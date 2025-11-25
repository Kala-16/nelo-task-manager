import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-blue-600 text-white p-4">
            <h1 className="text-2xl font-bold">Task Manager</h1>
            <nav className="mt-2">
                <ul className="flex space-x-4">
                    <li><a href="/" className="hover:underline">Home</a></li>
                    <li><a href="/tasks" className="hover:underline">Tasks</a></li>
                    <li><a href="/login" className="hover:underline">Login</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;