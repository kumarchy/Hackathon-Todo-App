import React, { useState } from 'react';
import {
  Search,
  Filter
} from 'lucide-react';

import Sidebar from './Sidebar';
import TodoItem from './TodoItem';
import FilterSidebar from './FilterSidebar';
import Navbar from './Navbar';

const sampleTodos = [
  {
    id: 1,
    title: "How To Protect Your Computer Very Useful",
    completed: false,
    favorite: false,
    assignees: [
      { id: 1, name: "John", avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" },
      { id: 2, name: "Sarah", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" },
      { id: 3, name: "Mike", avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" }
    ]
  },
  {
    id: 2,
    title: "How Hypnosis Can Help You",
    completed: false,
    favorite: true,
    assignees: [
      { id: 4, name: "Emma", avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" },
      { id: 5, name: "Alex", avatar: "https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" }
    ]
  },
  {
    id: 3,
    title: "Dealing With Technical Support 10",
    completed: false,
    favorite: false,
    assignees: [
      { id: 6, name: "Lisa", avatar: "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" },
      { id: 7, name: "Tom", avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" },
      { id: 8, name: "Kate", avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" }
    ]
  },
  {
    id: 4,
    title: "Get The Boot A Birds Eye Look Into Mcse Boot Camp",
    completed: true,
    favorite: true,
    assignees: [
      { id: 9, name: "Ryan", avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" },
      { id: 10, name: "Amy", avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" }
    ]
  },
  {
    id: 5,
    title: "Buying Used Electronic Test Equipment",
    completed: false,
    favorite: true,
    assignees: [
      { id: 11, name: "Ben", avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" },
      { id: 12, name: "Zoe", avatar: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" }
    ]
  },
  {
    id: 6,
    title: "Fix Responsiveness",
    completed: false,
    favorite: true,
    assignees: [
      { id: 13, name: "Dave", avatar: "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" }
    ]
  },
  {
    id: 7,
    title: "Hypnotherapy For Motivation Getting The Drive Back",
    completed: false,
    favorite: true,
    assignees: [
      { id: 14, name: "Nina", avatar: "https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" }
    ]
  },
  {
    id: 8,
    title: "Are You Struggling In Life",
    completed: false,
    favorite: false,
    assignees: [
      { id: 15, name: "Paul", avatar: "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" }
    ]
  },
  {
    id: 9,
    title: "Believing Is The Absence Of Doubt",
    completed: false,
    favorite: false,
    assignees: [
      { id: 16, name: "Lucy", avatar: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" },
      { id: 17, name: "Max", avatar: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" }
    ]
  },
  {
    id: 10,
    title: "Success Steps For Your Personal Or Business Life",
    completed: false,
    favorite: true,
    assignees: [
      { id: 18, name: "Eva", avatar: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" },
      { id: 19, name: "Sam", avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" }
    ]
  }
];

const MainLayout = () => {
  const [todos, setTodos] = useState(sampleTodos);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('Order by');

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());

    switch (currentFilter) {
      case 'my-task':
        return matchesSearch;
      case 'favorites':
        return matchesSearch && todo.favorite;
      case 'done':
        return matchesSearch && todo.completed;
      case 'deleted':
        return false;
      default:
        return matchesSearch;
    }
  });

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const toggleFavorite = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, favorite: !todo.favorite } : todo
    ));
  };

  const getCounts = () => ({
    all: todos.length,
    done: todos.filter(t => t.completed).length,
    favorites: todos.filter(t => t.favorite).length,
    deleted: 0
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <Navbar />
          <div className="flex flex-1">
            <main className="flex-1 p-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Filter className="w-4 h-4 text-gray-600" />
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 border-0 focus:ring-2 focus:ring-purple-500 outline-none"
                      >
                        <option>Priority</option>
                        <option>Date Created</option>
                      </select>
                    </div>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search todo list"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg border-0 focus:ring-2 focus:ring-purple-500 outline-none w-64"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleTodo}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              </div>
            </main>
            <FilterSidebar
              currentFilter={currentFilter}
              onFilterChange={setCurrentFilter}
              counts={getCounts()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
