export default function TimeSlot({ hour, value, isCurrent, onChange }) {
  return (
    <div className={`planner-slot${isCurrent ? ' is-current' : ''}`}>
      <span className="planner-slot__hour">{hour}</span>
      <input
        value={value || ''}
        placeholder="Nothing planned"
        onChange={(e) => onChange(hour, e.target.value)}
      />
    </div>
  );
}
