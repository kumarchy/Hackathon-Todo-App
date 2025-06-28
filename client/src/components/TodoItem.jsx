import React from 'react';
import { Star, MoreHorizontal, Check } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onToggleFavorite }) => {

  return (
    <div className={`group bg-white/30 backdrop-blur-sm rounded-xl p-4 border transition-all duration-200 hover:bg-white/40 hover:shadow-lg ${
      todo.completed ? 'border-green-300/50 bg-green-50/30' : 'border-white/30'
    }`}>
      <div className="flex items-center space-x-4">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            todo.completed 
              ? 'bg-green-500 border-green-500' 
              : 'border-gray-300 hover:border-purple-500'
          }`}
        >
          {todo.completed && <Check className="w-3 h-3 text-white" />}
        </button>

        {/* Star */}
        <button
          onClick={() => onToggleFavorite(todo.id)}
          className={`transition-colors ${
            todo.favorite ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-500'
          }`}
        >
          <Star className={`w-4 h-4 ${todo.favorite ? 'fill-current' : ''}`} />
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium truncate ${
            todo.completed ? 'text-gray-600 line-through' : 'text-gray-800'
          }`}>
            {todo.title}
          </h3>
        </div>


        {/* Assignee Avatars */}
        <div className="flex items-center -space-x-2">
          {todo.assignees.slice(0, 4).map((user, index) => (
            <img
              key={user.id}
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
              style={{ zIndex: todo.assignees.length - index }}
              title={user.name}
            />
          ))}
          {todo.assignees.length > 4 && (
            <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
              +{todo.assignees.length - 4}
            </div>
          )}
        </div>

        {/* More Options */}
        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/20 rounded">
          <MoreHorizontal className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
