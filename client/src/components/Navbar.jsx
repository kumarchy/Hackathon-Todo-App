import React from 'react';
import { Plus, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Navbar = () => {
  const navigate = useNavigate();
  const toggleSidebar = (toggle) => {
    <Sidebar toggle={toggle} />;
  }
  return (
    <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          {/* Mobile menu button */}
          <button
            className="block lg:hidden text-gray-800"
            onClick={toggleSidebar}
          >
            <Menu className="w-6 h-6 cursor-pointer" onClick={()=>toggleSidebar(true)}/>
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
            </div>
            <h1 className="text-xl font-semibold text-gray-800">TaskMesh</h1>
          </div>
          
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 cursor-pointer transition-all duration-200 flex items-center space-x-2 shadow-lg"
            onClick={() => navigate('/add-task')}
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
