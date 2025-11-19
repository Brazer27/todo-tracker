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

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header with modern design */}
        <header className="text-center mb-12 animate-fadeIn">
          <div className="inline-block mb-6 relative">
            <div className="absolute inset-0 bg-white/30 blur-2xl rounded-full"></div>
            <div className="relative bg-white/25 backdrop-blur-xl rounded-full p-6 shadow-2xl border border-white/40">
              <svg 
                className="w-20 h-20 text-white float-icon" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" 
                />
              </svg>
            </div>
          </div>
          
          <h1 className="text-6xl sm:text-7xl font-black text-white mb-4 tracking-tight drop-shadow-2xl">
            Todo<span className="text-purple-200">Tracker</span>
          </h1>
          <p className="text-2xl text-white/95 font-light mb-2 drop-shadow-lg">
            Organize your life, one task at a time
          </p>
          <p className="text-lg text-white/80 font-light flex items-center justify-center gap-2">
            <span>✨</span>
            <span>Stay productive and achieve your goals</span>
            <span>✨</span>
          </p>

          {/* Enhanced Progress Stats Card */}
          {totalCount > 0 && (
            <div className="mt-8 glass rounded-3xl p-8 max-w-2xl mx-auto animate-scaleIn card-shine shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <div className="text-left">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Overall Progress
                  </h3>
                  <p className="text-4xl font-black gradient-text">
                    {Math.round(progressPercentage)}%
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex gap-3">
                    <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl p-4 shadow-lg">
                      <div className="text-3xl font-black text-white">{completedCount}</div>
                      <div className="text-xs text-white/90 font-semibold uppercase mt-1">Done</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-400 to-pink-600 rounded-2xl p-4 shadow-lg">
                      <div className="text-3xl font-black text-white">{totalCount - completedCount}</div>
                      <div className="text-xs text-white/90 font-semibold uppercase mt-1">Todo</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                  style={{
                    width: `${progressPercentage}%`,
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'gradientShift 3s ease infinite'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between text-sm">
                <span className="text-gray-600 font-medium">
                  🎯 {completedCount} tasks completed
                </span>
                <span className="text-gray-600 font-medium">
                  🚀 {totalCount - completedCount} to go
                </span>
              </div>
            </div>
          )}
        </header>

        {/* Error Message with modern styling */}
        {error && (
          <div className="glass rounded-3xl p-6 mb-8 border-l-4 border-red-500 animate-slideIn shadow-xl">
            <div className="flex items-start">
              <div className="bg-red-100 rounded-full p-3 mr-4">
                <svg 
                  className="w-6 h-6 text-red-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-bold text-red-700 text-xl mb-2">Connection Error</p>
                <p className="text-red-600 mb-3">{error}</p>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-sm text-red-700 flex items-center gap-2">
                    <span className="text-lg">🔌</span>
                    <span>Make sure the backend server is running on</span>
                    <code className="bg-red-100 px-3 py-1 rounded-lg font-mono text-red-800 font-semibold">
                      http://localhost:5000
                    </code>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Todo Form */}
        <div className="mb-10 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <TodoForm onTodoAdded={fetchTodos} />
        </div>

        {/* Todo List */}
        <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <TodoList todos={todos} onUpdate={fetchTodos} loading={loading} />
        </div>

        {/* Enhanced Footer */}
        <footer className="mt-16 text-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <div className="glass rounded-2xl p-6 inline-block shadow-xl">
            <p className="text-gray-700 font-medium flex items-center gap-2">
              <span>Made with</span>
              <span className="text-2xl animate-pulse">💜</span>
              <span>by You</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Stay organized • Stay productive • Stay awesome
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
