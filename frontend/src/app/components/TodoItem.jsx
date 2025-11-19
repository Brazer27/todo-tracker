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
    if (!confirm('🗑️ Are you sure you want to delete this task?')) return;

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
    <div 
      className={`glass rounded-2xl shadow-lg p-7 border-l-4 transition-all duration-300 hover-lift card-shine relative overflow-hidden ${
        todo.completed 
          ? 'border-green-500 bg-gradient-to-r from-green-50/90 to-white/95' 
          : 'border-purple-500 bg-white/95'
      }`}
    >
      {/* Subtle background decoration */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 ${
        todo.completed ? 'bg-green-400' : 'bg-purple-400'
      }`}></div>

      <div className="flex items-start gap-5 relative z-10">
        {/* Enhanced Checkbox */}
        <div className="flex-shrink-0 mt-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggleComplete}
            disabled={loading}
            className="cursor-pointer"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className={`text-2xl font-bold mb-3 transition-all duration-300 ${
                todo.completed 
                  ? 'line-through text-gray-400' 
                  : 'text-gray-800'
              }`}>
                {todo.title}
              </h3>
              
              {todo.description && (
                <div className={`mb-4 ${todo.completed ? 'opacity-60' : ''}`}>
                  <p className={`text-base leading-relaxed font-medium ${
                    todo.completed 
                      ? 'text-gray-400' 
                      : 'text-gray-600'
                  }`}>
                    {todo.description}
                  </p>
                </div>
              )}
              
              <div className="flex items-center gap-4 text-sm flex-wrap">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${
                  todo.completed 
                    ? 'bg-gray-100 text-gray-500' 
                    : 'bg-purple-50 text-purple-700'
                }`}>
                  <svg 
                    className="flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    width="16"
                    height="16"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  <span className="font-semibold">{new Date(todo.createdAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
                
                {todo.completed && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md">
                    <svg 
                      className="flex-shrink-0" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      width="16"
                      height="16"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <span className="font-bold text-sm">Completed</span>
                  </div>
                )}
              </div>
            </div>

            {/* Delete Button - Fixed size with explicit width/height */}
            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex-shrink-0 p-2 text-red-500 hover:text-white hover:bg-gradient-to-br hover:from-red-500 hover:to-pink-600 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group shadow-md hover:shadow-lg"
              title="Delete task"
            >
              <svg 
                className="group-hover:scale-110 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth={2}
                width="20"
                height="20"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
