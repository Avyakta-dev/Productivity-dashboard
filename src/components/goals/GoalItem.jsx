export default function GoalItem({ goal, onToggle, onDelete }) {
  return (
    <li className={`item-row${goal.done ? ' is-complete' : ''}`}>
      <button
        className="item-row__icon-btn"
        onClick={() => onToggle(goal.id)}
        aria-label={goal.done ? 'Mark incomplete' : 'Mark done'}
      >
        {goal.done ? '☑' : '☐'}
      </button>
      <span className="item-row__text">{goal.text}</span>
      <button className="item-row__icon-btn" onClick={() => onDelete(goal.id)} aria-label="Delete goal">
        ✕
      </button>
    </li>
  );
}
