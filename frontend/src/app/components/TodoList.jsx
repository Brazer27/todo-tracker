'use client';

import TodoItem from './TodoItem';

export default function TodoList({ todos, onUpdate, loading }) {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading todos...</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No todos yet</h3>
        <p className="mt-1 text-gray-500">Get started by creating a new todo above.</p>
      </div>
    );
  }

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div>
      <div className="mb-4 bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Your Todos</h2>
          <span className="text-sm text-gray-600">
            {completedCount} / {totalCount} completed
          </span>
        </div>
      </div>
      
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onUpdate}
        />
      ))}
    </div>
  );
}