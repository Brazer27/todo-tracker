'use client';

import TodoItem from './TodoItem';

export default function TodoList({ todos, onUpdate, loading }) {
  if (loading) {
    return (
      <div className="glass rounded-3xl shadow-2xl p-16 text-center animate-fadeIn">
        <div className="inline-flex items-center justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg 
                className="text-purple-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth={2}
                width="40"
                height="40"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                />
              </svg>
            </div>
          </div>
        </div>
        <p className="text-2xl text-gray-700 font-bold mb-2">Loading your tasks...</p>
        <p className="text-base text-gray-500">Please wait a moment</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="glass rounded-3xl shadow-2xl p-16 text-center animate-scaleIn overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-xl mx-auto relative z-10">
          {/* Empty state illustration */}
          <div className="mb-8 inline-block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 rounded-3xl blur-2xl opacity-60"></div>
              <div className="relative bg-gradient-to-br from-purple-100 via-pink-50 to-purple-50 rounded-3xl p-10 float-icon shadow-xl">
                <svg
                  className="w-24 h-24 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
            </div>
          </div>

          <h3 className="text-4xl font-black text-gray-800 mb-4">
            No Tasks Yet! 🎯
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium">
            Your task list is empty. Start by creating your first task above and take control of your day!
          </p>

          {/* Tips */}
          <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 rounded-2xl p-6 text-left border border-purple-100 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-2 mr-3 flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                </svg>
              </div>
              <p className="text-base font-bold text-gray-800">💡 Quick Tips</p>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start text-sm text-gray-700">
                <span className="text-purple-500 font-bold mr-3 mt-1 flex-shrink-0">✓</span>
                <span className="font-medium">Add a clear title for each task</span>
              </li>
              <li className="flex items-start text-sm text-gray-700">
                <span className="text-purple-500 font-bold mr-3 mt-1 flex-shrink-0">✓</span>
                <span className="font-medium">Use descriptions for additional details</span>
              </li>
              <li className="flex items-start text-sm text-gray-700">
                <span className="text-purple-500 font-bold mr-3 mt-1 flex-shrink-0">✓</span>
                <span className="font-medium">Check off tasks as you complete them</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const pendingCount = totalCount - completedCount;

  return (
    <div>
      {/* Enhanced Stats Header */}
      <div className="glass rounded-3xl shadow-2xl p-8 mb-8 animate-fadeIn card-shine overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        
        <div className="flex items-center justify-between flex-wrap gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-75"></div>
              <div className="relative bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 rounded-2xl p-4 shadow-lg">
                <svg 
                  className="w-8 h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                  />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-800 tracking-tight">Your Tasks</h2>
              <p className="text-base text-gray-500 mt-1 font-semibold">
                {totalCount} {totalCount === 1 ? 'task' : 'tasks'} total
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl px-6 py-4 shadow-md border border-green-100">
              <div className="text-4xl font-black gradient-text bg-gradient-to-r from-green-500 to-emerald-600">{completedCount}</div>
              <div className="text-xs text-gray-600 uppercase tracking-wider font-bold mt-1">Completed</div>
            </div>
            <div className="h-16 w-px bg-gray-300"></div>
            <div className="text-center bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl px-6 py-4 shadow-md border border-orange-100">
              <div className="text-4xl font-black gradient-text bg-gradient-to-r from-orange-500 to-pink-600">{pendingCount}</div>
              <div className="text-xs text-gray-600 uppercase tracking-wider font-bold mt-1">Pending</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Todo Items */}
      <div className="space-y-5">
        {todos.map((todo, index) => (
          <div 
            key={todo.id}
            style={{ animationDelay: `${index * 0.05}s` }}
            className="animate-slideIn"
          >
            <TodoItem
              todo={todo}
              onUpdate={onUpdate}
              onDelete={onUpdate}
            />
          </div>
        ))}
      </div>

      {/* Motivational message when all completed */}
      {completedCount === totalCount && totalCount > 0 && (
        <div className="mt-8 glass rounded-3xl p-10 text-center animate-scaleIn card-shine shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 via-emerald-100/50 to-teal-100/50"></div>
          <div className="relative z-10">
            <div className="text-7xl mb-5 float-icon">🎉</div>
            <h3 className="text-3xl font-black text-gray-800 mb-3">
              Amazing Work!
            </h3>
            <p className="text-lg text-gray-600 font-medium mb-4">
              You've completed all your tasks. Time to celebrate! 🎊
            </p>
            <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full px-6 py-3 font-bold shadow-lg">
              🏆 All Done!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
