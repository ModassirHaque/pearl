// frontend/pages/index.jsx
import React, { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import DatePicker from '../components/DatePicker';
import useTasksStore from '../hooks/useTasks';

const HomePage = () => {
  const { tasks, fetchTasks, addTask } = useTasksStore();
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [recurrenceOptions, setRecurrenceOptions] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    await addTask({ ...newTask, recurrence: recurrenceOptions });
    setNewTask({ title: '', description: '' });
    setRecurrenceOptions(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">To-Do List with Recurring Tasks</h1>
      
      <form onSubmit={handleAddTask} className="mt-4">
        <div>
          <label className="block">Task Title:</label>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
                className="mt-1 border rounded p-2"
                required
              />
            </div>
    
            <div className="mt-4">
              <label className="block">Task Description:</label>
              <textarea
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                className="mt-1 border rounded p-2"
                rows="3"
              />
            </div>
    
            <div className="mt-4">
              <DatePicker onSelect={setRecurrenceOptions} />
            </div>
    
            <button type="submit" className="mt-4 bg-green-500 text-white py-2 px-4 rounded">
              Add Task
            </button>
          </form>
    
          <TaskList tasks={tasks} />
        </div>
      );
    };
    
    export default HomePage;