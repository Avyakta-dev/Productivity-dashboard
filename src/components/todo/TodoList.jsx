import { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import TodoItem from './TodoItem';

export default function TodoList() {
  // Persisted list of { id, text, completed, important }
  const [tasks, setTasks] = useLocalStorage('dashboard:todo-tasks', []);
  const [input, setInput] = useState('');

  const addTask = (e) => {
    e.preventDefault(); // <form onSubmit> covers both button click AND Enter key
    const text = input.trim();
    if (!text) return;
    setTasks([
      ...tasks,
      { id: crypto.randomUUID(), text, completed: false, important: false },
    ]);
    setInput('');
  };

  const toggleComplete = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const toggleImportant = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, important: !t.important } : t)));

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  return (
    <div>
      <form className="form-row" onSubmit={addTask}>
        <input
          className="nb-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs doing?"
        />
        <button className="nb-btn" type="submit">Add</button>
      </form>

      {tasks.length === 0 ? (
        <p className="empty-state">No tasks yet — add your first one above.</p>
      ) : (
        <ul className="item-list">
          {tasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onToggleComplete={toggleComplete}
              onToggleImportant={toggleImportant}
              onDelete={deleteTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
