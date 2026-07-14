import { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import GoalItem from './GoalItem';

export default function DailyGoals() {
  // Same shape/pattern as TodoList, reused as the spec suggests.
  const [goals, setGoals] = useLocalStorage('dashboard:daily-goals', []);
  const [input, setInput] = useState('');

  const addGoal = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setGoals([...goals, { id: crypto.randomUUID(), text, done: false }]);
    setInput('');
  };

  const toggleGoal = (id) =>
    setGoals(goals.map((g) => (g.id === id ? { ...g, done: !g.done } : g)));

  const deleteGoal = (id) => setGoals(goals.filter((g) => g.id !== id));

  // Derived from `goals` on every render — never stored separately,
  // so it can never drift out of sync with the actual list.
  const completedCount = goals.filter((g) => g.done).length;
  const percent = goals.length ? Math.round((completedCount / goals.length) * 100) : 0;

  return (
    <div>
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
      </div>
      <p className="progress-label">
        {completedCount} of {goals.length} completed
      </p>

      <form className="form-row" onSubmit={addGoal} style={{ marginTop: '1.25rem' }}>
        <input
          className="nb-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What do you want to achieve today?"
        />
        <button className="nb-btn" type="submit">Add</button>
      </form>

      {goals.length === 0 ? (
        <p className="empty-state">No goals set yet — start with one small win.</p>
      ) : (
        <ul className="item-list">
          {goals.map((g) => (
            <GoalItem key={g.id} goal={g} onToggle={toggleGoal} onDelete={deleteGoal} />
          ))}
        </ul>
      )}
    </div>
  );
}
