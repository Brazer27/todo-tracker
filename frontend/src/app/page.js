'use client';

import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch todos');
      }

      setTodos(data.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📝 Todo Tracker
          </h1>
          <p className="text-gray-600">
            Manage your tasks efficiently
          </p>
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-semibold">Error connecting to API</p>
            <p className="text-sm">{error}</p>
            <p className="text-sm mt-2">
              Make sure the backend server is running on http://localhost:5000
            </p>
          </div>
        )}

        <TodoForm onTodoAdded={fetchTodos} />
        <TodoList todos={todos} onUpdate={fetchTodos} loading={loading} />
      </div>
    </main>
  );
}
