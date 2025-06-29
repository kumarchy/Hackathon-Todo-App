import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter } from 'lucide-react';
import { io } from 'socket.io-client';
import { toast, Toaster } from 'react-hot-toast';

import Sidebar from './Sidebar';
import TodoItem from './TodoItem';
import FilterSidebar from './FilterSidebar';
import Navbar from './Navbar';

const MainLayout = () => {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('Order by');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 7;

  const [showShareModal, setShowShareModal] = useState(false);
  const [shareTaskId, setShareTaskId] = useState(null);
  const [shareEmail, setShareEmail] = useState('');

  useEffect(() => {
    const socket = io('http://localhost:5001');
    socket.on('connect', () => console.log('🟢 Connected:', socket.id));

    socket.on('task_created', (newTask) => {
      toast.success(`Task "${newTask.title}" created`);
      setTodos((prev) => [newTask, ...prev]);
    });

    socket.on('task_updated', (updatedTask) => {
      toast.success(`✏️ Task "${updatedTask.title}" updated`);
      setTodos((prev) => prev.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
    });

    socket.on('task_deleted', ({ id }) => {
      toast('A task was deleted', { icon: '🗑️' });
      setTodos((prev) => prev.filter((t) => t._id !== id));
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        let url = 'http://localhost:5001/task/getTask';

        if (searchQuery.trim() !== '') {
          url = `http://localhost:5001/task/search?query=${encodeURIComponent(searchQuery)}`;
        }

        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setTodos(response.data);
        setLoading(false);
      } catch (error) {
        console.error('❌ Failed to fetch tasks:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, currentFilter, sortBy]);

  const filteredTodos = todos
    .filter(todo => {
      const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());

      switch (currentFilter) {
        case 'my-task':
          return matchesSearch;
        case 'favorites':
          return matchesSearch && todo.favorite;
        case 'done':
          return matchesSearch && todo.completed;
        default:
          return matchesSearch;
      }
    })
    .sort((a, b) => {
      if (sortBy === 'Priority') {
        const priorityRank = { high: 1, medium: 2, low: 3 };
        return (priorityRank[a.priority] || 4) - (priorityRank[b.priority] || 4);
      }
      if (sortBy === 'Due Date') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTodos.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTodos.length / tasksPerPage);

  const toggleTodo = async (id) => {
    const updated = todos.map(todo =>
      todo._id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
  };

  const toggleFavorite = (id) => {
    const updated = todos.map(todo =>
      todo._id === id ? { ...todo, favorite: !todo.favorite } : todo
    );
    setTodos(updated);
  };

  const getCounts = () => ({
    all: todos.length,
    done: todos.filter(t => t.completed).length,
    favorites: todos.filter(t => t.favorite).length,
    deleted: 0
  });

  const shareTaskWithUser = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5001/task/shareTask/${shareTaskId}`, { email: shareEmail }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Task shared with ${shareEmail}`);
      setShowShareModal(false);
      setShareEmail('');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to share task');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400">
      <Toaster position="top-right" reverseOrder={false} />
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
                        <option>Due Date</option>
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

                {loading ? (
                  <p className="text-white text-center">Loading tasks...</p>
                ) : (
                  <>
                    <div className="space-y-3">
                      {currentTasks.map((todo) => (
                        <TodoItem
                          key={todo._id}
                          todo={todo}
                          onToggle={toggleTodo}
                          onToggleFavorite={toggleFavorite}
                          onShare={(id) => {
                            setShareTaskId(id);
                            setShowShareModal(true);
                          }}
                        />
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <div className="flex justify-center mt-6 space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              currentPage === i + 1
                                ? 'bg-purple-600 text-white'
                                : 'bg-white/80 text-purple-600 hover:bg-purple-200'
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
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

      {showShareModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4">Share Task</h2>
            <input
              type="email"
              value={shareEmail}
              onChange={(e) => setShareEmail(e.target.value)}
              placeholder="Enter user's email"
              className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={shareTaskWithUser}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
