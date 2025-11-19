'use client';

import { useState } from 'react';

export default function TodoForm({ onTodoAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create todo');
      }

      setTitle('');
      setDescription('');
      onTodoAdded();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-3xl shadow-2xl p-10 hover-lift card-shine">
      <div className="flex items-center mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-75"></div>
          <div className="relative bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 rounded-2xl p-4 shadow-lg">
            <svg 
              className="w-7 h-7 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 4v16m8-8H4" 
              />
            </svg>
          </div>
        </div>
        <div className="ml-5">
          <h2 className="text-4xl font-black text-gray-800 tracking-tight">Create New Task</h2>
          <p className="text-gray-500 mt-1 font-medium">Add what you need to accomplish</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 rounded-2xl px-6 py-4 mb-6 animate-slideIn shadow-lg">
            <div className="flex items-center">
              <div className="bg-red-100 rounded-full p-2 mr-3">
                <svg 
                  className="w-5 h-5 text-red-600" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
              <div>
                <span className="font-bold text-red-700">{error}</span>
                <p className="text-sm text-red-600 mt-1">Please check and try again</p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-7">
          <label 
            htmlFor="title" 
            className="flex items-center text-gray-700 font-bold mb-3 text-sm uppercase tracking-wider"
          >
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-3 py-1 text-xs mr-3 shadow-md font-semibold">
              Required
            </span>
            Task Title
          </label>
          <div className="relative">
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl focus:border-purple-500 transition-all duration-300 text-gray-800 font-semibold placeholder-gray-400 bg-white shadow-sm hover:shadow-md"
              placeholder="e.g., Complete project documentation"
              disabled={loading}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <label 
            htmlFor="description" 
            className="flex items-center text-gray-700 font-bold mb-3 text-sm uppercase tracking-wider"
          >
            <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-xs mr-3 shadow-sm font-semibold">
              Optional
            </span>
            Description
          </label>
          <div className="relative">
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl focus:border-purple-500 transition-all duration-300 text-gray-800 font-medium placeholder-gray-400 resize-none bg-white shadow-sm hover:shadow-md"
              placeholder="Add more details about this task..."
              rows="5"
              disabled={loading}
            />
            <div className="absolute right-4 bottom-4 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary ripple text-white font-bold py-5 px-8 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-2xl text-lg tracking-wide"
        >
          {loading ? (
            <>
              <svg 
                className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Creating Task...
            </>
          ) : (
            <>
              <svg 
                className="w-6 h-6 mr-3" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M12 4v16m8-8H4" 
                />
              </svg>
              Add Task
            </>
          )}
        </button>
      </form>
    </div>
  );
}
