export default function TodoItem({ task, onToggleComplete, onToggleImportant, onDelete }) {
  const rowClass = [
    'item-row',
    task.completed ? 'is-complete' : '',
    task.important ? 'is-important' : '',
  ].join(' ').trim();

  return (
    <li className={rowClass}>
      <button
        className="item-row__icon-btn"
        onClick={() => onToggleComplete(task.id)}
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
        title={task.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {task.completed ? '☑' : '☐'}
      </button>

      <span className="item-row__text">{task.text}</span>

      <button
        className="item-row__icon-btn"
        onClick={() => onToggleImportant(task.id)}
        aria-label={task.important ? 'Unmark important' : 'Mark important'}
        title="Mark important"
      >
        {task.important ? '★' : '☆'}
      </button>

      <button
        className="item-row__icon-btn"
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
        title="Delete"
      >
        ✕
      </button>
    </li>
  );
}
