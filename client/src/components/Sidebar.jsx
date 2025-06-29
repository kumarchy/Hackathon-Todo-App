import React, { useState } from "react";
import { BarChart3, User, ChevronRight, Menu, X } from "lucide-react";

const Sidebar = ({ toggle }) => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <aside
      className={`w-64 bg-white/10 backdrop-blur-sm border-r border-white/20 min-h-screen 
    ${toggle ? "block" : "hidden"} lg:block`}
    >
      {/* User Profile */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-semibold border-2 border-white shadow-sm">
            {userInitial || "U"}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">
              {user.name?.replace(/\b\w/g, (char) => char.toUpperCase())}
            </h3>
            <p className="text-sm text-gray-600">Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Dashboard
          </p>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-white/20 transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Pages
          </p>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 hover:bg-white/20 transition-colors"
              >
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
