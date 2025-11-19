'use client';

import { useState } from 'react';

export default function TodoItem({ todo, onUpdate, onDelete }) {
  const [loading, setLoading] = useState(false);

  const handleToggleComplete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });

      if (response.ok) {
        onUpdate();
      }
    } catch (err) {
      console.error('Error updating todo:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this todo?')) return;

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${todo.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete();
      }
    } catch (err) {
      console.error('Error deleting todo:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 mb-3 border-l-4 ${
      todo.completed ? 'border-green-500 bg-gray-50' : 'border-blue-500'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start flex-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggleComplete}
            disabled={loading}
            className="mt-1 mr-3 h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
          />
          <div className="flex-1">
            <h3 className={`text-lg font-semibold ${
              todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
            }`}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className={`mt-1 text-sm ${
                todo.completed ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {todo.description}
              </p>
            )}
            <p className="mt-2 text-xs text-gray-400">
              Created: {new Date(todo.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="ml-4 text-red-600 hover:text-red-800 font-semibold disabled:text-gray-400 transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
}