// frontend/components/TaskList.jsx
import React from 'react';
import useTasksStore from '../hooks/useTasks';

const TaskList = ({ tasks }) => {
  const { updateTask, deleteTask } = useTasksStore();

  const handleToggleComplete = (task) => {
    updateTask(task.id, { ...task, completed: !task.completed });
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold">Your Tasks</h2>
      <ul className="mt-2 space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center p-2 border rounded">
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task)}
                className="mr-2"
              />
              <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
              {task.recurrence && <span className="text-sm text-gray-500"> (Recurring)</span>}
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;