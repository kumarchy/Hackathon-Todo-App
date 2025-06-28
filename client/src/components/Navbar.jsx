import React from 'react'
import {
  Bell,
  Plus,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
  return (
        <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                  </div>
                  <h1 className="text-xl font-semibold text-gray-800">CakeAdmin</h1>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Todo List</h2>
              </div>

              <div className="flex items-center space-x-4">
  

                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-purple-600 transition-colors" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">4</span>
                  </div>

                  <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 cursor-pointer transition-all duration-200 flex items-center space-x-2 shadow-lg" onClick={() => navigate('/add-task')}>
                    <Plus className="w-4 h-4" />
                    <span>Add Task</span>
                  </button>
                </div>
              </div>
            </div>
          </header>
  )
}

export default Navbar;