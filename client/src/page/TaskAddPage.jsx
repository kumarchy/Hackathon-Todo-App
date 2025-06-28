import React, { useState } from 'react';
import axios from 'axios';
import { Calendar, Flag, FileText, Type, Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function TaskAddPage() {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });

//   const [showForm, setShowForm] = useState(true);
  const navigate = useNavigate(); // To redirect after creation
  
  const token = localStorage.getItem('token');

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      'http://localhost:5001/task/createTask',
      task,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert('✅ Task created successfully!');
    console.log('Created Task:', response.data);
    setTask({ title: '', description: '', dueDate: '', priority: 'medium' });
    navigate('/');

  } catch (error) {
    console.error('❌ Error creating task:', error.response?.data || error.message);
    alert('Failed to create task');
  }
};

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'from-red-400 to-red-600';
      case 'medium': return 'from-yellow-400 to-orange-500';
      case 'low': return 'from-green-400 to-green-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-blue-500 p-4 md:p-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/')} // go back to homepage
            className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Add New Task</h1>
            <p className="text-white/80 text-lg">Create a task to stay organized and productive</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title */}
            <div className="group">
              <label className="flex items-center gap-3 text-white font-semibold mb-4 text-lg">
                <div className="p-2 rounded-lg bg-white/10">
                  <Type className="w-5 h-5" />
                </div>
                Task Title
              </label>
              <input
                type="text"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60"
                placeholder="Enter your task title..."
                required
              />
            </div>

            {/* Description */}
            <div className="group">
              <label className="flex items-center gap-3 text-white font-semibold mb-4 text-lg">
                <div className="p-2 rounded-lg bg-white/10">
                  <FileText className="w-5 h-5" />
                </div>
                Description
              </label>
              <textarea
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
                rows={4}
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 resize-none"
                placeholder="Describe your task in detail..."
              />
            </div>

            {/* Due Date and Priority */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group">
                <label className="flex items-center gap-3 text-white font-semibold mb-4 text-lg">
                  <div className="p-2 rounded-lg bg-white/10">
                    <Calendar className="w-5 h-5" />
                  </div>
                  Due Date
                </label>
                <input
                  type="date"
                  value={task.dueDate}
                  onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white"
                  required
                />
              </div>

              <div className="group">
                <label className="flex items-center gap-3 text-white font-semibold mb-4 text-lg">
                  <div className="p-2 rounded-lg bg-white/10">
                    <Flag className="w-5 h-5" />
                  </div>
                  Priority Level
                </label>
                <select
                  value={task.priority}
                  onChange={(e) => setTask({ ...task, priority: e.target.value })}
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white"
                >
                  <option value="low" className="bg-gray-800 text-white">Low Priority</option>
                  <option value="medium" className="bg-gray-800 text-white">Medium Priority</option>
                  <option value="high" className="bg-gray-800 text-white">High Priority</option>
                </select>
              </div>
            </div>

            {/* Preview */}
            <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl border border-white/20">
              <span className="text-white/80 font-medium">Priority Preview:</span>
              <div className={`px-4 py-2 rounded-lg bg-gradient-to-r ${getPriorityColor(task.priority)} text-white font-semibold capitalize`}>
                {task.priority} Priority
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white font-bold py-4 px-8 rounded-xl border border-white/30"
              >
                <Plus className="w-6 h-6 mr-2 inline-block" />
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TaskAddPage;
