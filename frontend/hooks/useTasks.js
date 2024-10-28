// frontend/hooks/useTasks.js
import create from 'zustand';

const useTasksStore = create((set) => ({
  tasks: [],
  fetchTasks: async () => {
    const response = await fetch('http://localhost:5000/api/tasks');
    const data = await response.json();
    set({ tasks: data });
  },
  addTask: async (task) => {
    const response = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    const newTask = await response.json();
    set((state) => ({ tasks: [...state.tasks, newTask] }));
  },
  updateTask: async (id, updatedTask) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task)),
    }));
  },
  deleteTask: async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE',
    });
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }));
  },
}));

export default useTasksStore;