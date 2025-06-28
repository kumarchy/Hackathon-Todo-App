import React from 'react';
import { 
  BarChart3, 
  ShoppingBag, 
  Package, 
  ShoppingCart, 
  Users, 
  FileText,
  MessageCircle,
  Mail,
  CheckSquare,
  User,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white/10 backdrop-blur-sm border-r border-white/20 min-h-screen">
      {/* User Profile */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center space-x-3">
          <img
            src="https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2"
            alt="Timotheus Bendan"
            className="w-10 h-10 rounded-full border-2 border-white/30"
          />
          <div>
            <h3 className="font-semibold text-gray-800">Timotheus Bendan</h3>
            <p className="text-sm text-gray-600">Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Dashboard</p>
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-white/20 transition-colors">
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </a>
            </li>

            <li>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-white/20 transition-colors">
                <Users className="w-4 h-4" />
                <span>Customers</span>
              </a>
            </li>

          </ul>
        </div>

        {/* <div className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Apps</p>
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 hover:bg-white/20 transition-colors">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-4 h-4" />
                  <span>Chats</span>
                </div>
                <span className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 hover:bg-white/20 transition-colors">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4" />
                  <span>Email App</span>
                </div>
                <ChevronRight className="w-3 h-3" />
              </a>
            </li>
            <li>
              <div className="px-3 py-2">
                <div className="flex items-center justify-between text-gray-700 mb-2">
                  <div className="flex items-center space-x-3">
                    <CheckSquare className="w-4 h-4" />
                    <span>Todo App</span>
                  </div>
                  <ChevronRight className="w-3 h-3" />
                </div>
                <ul className="ml-7 space-y-1">
                  <li>
                    <a href="#" className="block px-3 py-1 text-sm bg-purple-100/50 text-purple-700 rounded-lg font-medium">
                      List
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-3 py-1 text-sm text-gray-600 hover:bg-white/20 rounded-lg transition-colors">
                      Details
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div> */}

        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Pages</p>
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 hover:bg-white/20 transition-colors">
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </div>
                <ChevronRight className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;