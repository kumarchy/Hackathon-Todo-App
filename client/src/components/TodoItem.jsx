import React, { useState } from "react";
import {
  Star,
  MoreHorizontal,
  Check,
  Trash2,
  Share2,
  Edit2,
  Calendar,
  Flag,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TodoItem = ({ todo, onToggle, onToggleFavorite, onShare }) => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5001/task/deleteTask/${todo._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.reload();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleUpdate = () => {
    navigate("/add-task", { state: { update: true, taskId: todo._id } });
  };

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  const isOverdue = (date) => {
    const due = new Date(date);
    const now = new Date();
    return due < now && !todo.completed;
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div
      className={`group relative bg-white/30 backdrop-blur-sm rounded-xl p-4 border transition-all duration-200 hover:bg-white/40 hover:shadow-lg ${
        todo.completed
          ? "border-green-300/50 bg-green-50/30"
          : "border-white/30"
      }`}
    >
      <div className="flex items-center space-x-4">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo._id)}
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            todo.completed
              ? "bg-green-500 border-green-500"
              : "border-gray-300 hover:border-purple-500"
          }`}
        >
          {todo.completed && <Check className="w-3 h-3 text-white" />}
        </button>

        {/* Favorite Star */}
        <button
          onClick={() => onToggleFavorite(todo._id)}
          className={`transition-colors ${
            todo.favorite
              ? "text-yellow-500"
              : "text-gray-300 hover:text-yellow-500"
          }`}
        >
          <Star className={`w-4 h-4 ${todo.favorite ? "fill-current" : ""}`} />
        </button>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            {/* Title */}
            <h3
              className={`font-medium ${
                todo.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {todo.title}
            </h3>

            {/* Due Date & Priority */}
            <div className="flex items-center space-x-2">
              <div
                className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium ${
                  isOverdue(todo.dueDate)
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                <Calendar className="w-3 h-3" />
                <span>{formatDate(todo.dueDate)}</span>
              </div>

              <div
                className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(
                  todo.priority
                )}`}
              >
                <Flag className="w-3 h-3" />
                <span className="capitalize">{todo.priority || "medium"}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          {todo.description && (
            <p className="text-sm text-gray-600 ml-1">{todo.description}</p>
          )}
        </div>

        {/* Avatar (initial) */}
        <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-semibold border-2 border-white shadow-sm">
          {userInitial || "U"}
        </div>

        {/* More Button */}
        <button
          onClick={() => setShowPopup(!showPopup)}
          className="p-1 hover:bg-white/20 rounded relative cursor-pointer"
        >
          <MoreHorizontal className="w-4 h-4 text-gray-600" />
        </button>

        {/* Popup */}
        {showPopup && (
          <div className="absolute top-12 right-4 bg-white text-black shadow-md rounded-lg z-10 border text-sm w-40">
            <button
              onClick={handleUpdate}
              className="w-full px-4 py-2 hover:bg-purple-100 flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" /> Update
            </button>
            <button
              onClick={() => onShare(todo._id)}
              className="w-full px-4 py-2 hover:bg-purple-100 flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button
              onClick={handleDelete}
              className="w-full px-4 py-2 text-red-600 hover:bg-purple-100 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
