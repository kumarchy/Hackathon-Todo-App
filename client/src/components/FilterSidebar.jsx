import React from 'react';
import { List, User, Heart, Check, Trash2 } from 'lucide-react';

/**
 * @param {{
 *   currentFilter: string,
 *   onFilterChange: (filter: string) => void,
 *   counts: {
 *     all: number,
 *     done: number,
 *     favorites: number,
 *     deleted: number
 *   }
 * }} props
 */
const FilterSidebar = ({ currentFilter, onFilterChange, counts }) => {
  const filterItems = [
    { id: 'all', label: 'All', icon: List, count: counts.all },
    { id: 'my-task', label: 'My Task', icon: User, count: null },
    { id: 'favorites', label: 'Favorites', icon: Heart, count: null },
    { id: 'done', label: 'Done', icon: Check, count: counts.done },
    { id: 'deleted', label: 'Deleted', icon: Trash2, count: null },
  ];

  return (
    <aside className="w-60 p-6">
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
        <ul className="space-y-2">
          {filterItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentFilter === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onFilterChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-purple-100/50 text-purple-700' 
                      : 'text-gray-700 hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.count !== null && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isActive 
                        ? 'bg-purple-200 text-purple-800' 
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default FilterSidebar;
