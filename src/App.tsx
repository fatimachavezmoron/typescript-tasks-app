import React, { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import './App.css';

interface Task {
  id: string;
  title: string;
  description: string;
}
  
  const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
  
    useEffect(() => {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      setTasks(storedTasks);
    }, []);
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const target = e.currentTarget;
      const titleInput = target['title'] as HTMLInputElement;
      const descriptionInput = target['description'] as HTMLTextAreaElement;
      
      const newTask: Task = {
        title: titleInput.value,
        description: descriptionInput.value,
        id: v4(),
      };
  
      setTasks([...tasks, newTask]);
      localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
  
      Toastify({
        text: 'Task added',
      }).showToast();
  
      titleInput.value = '';
      descriptionInput.value = '';
      titleInput.focus();
    };
  
    const handleDelete = (taskId: string) => {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

  return (
    <>
      <div className="bg-slate-800 text-white">
       <div className="flex justify-center items-center h-screen gap-x-2">
        <form onSubmit={handleSubmit} className="bg-slate-600 p-10 rounded-md max-w-md">
            <label for="title" className="block">Title</label>
            <input className="bg-gray-700 px-1 py-2 w-full rounded-md mb-2" name="title" type="text" placeholder="write a title"/>
            <label htmlFor="tdescription" className="block">Description</label>
            <textarea className="bg-gray-700 px-1 py-2 w-full rounded-md mb-2" name="description" rows={3}></textarea>
            <button className="bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-500">Save</button>
          </form>
          <div className="max-w-md w-full h-3/5 px-10 py-5 overflow-y-scroll rounded-md">
            <h3 className="pb-2">Task List</h3>
            {tasks.map(task => (
              <div key={task.id} className="bg-zinc-800 mb-1 p-4 rounded-lg hover:bg-zinc-700 hover:cursor-pointer">
                <header className="flex justify-between">
                  <span>{task.title}</span>
                  <button onClick={() => handleDelete(task.id)} className="bg-red-500 px-2 py-1 rounded-md">
                    Delete
                  </button>
                </header>
                <p>{task.description}</p>
                <p className="text-gray-400 text-xs">{task.id}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
