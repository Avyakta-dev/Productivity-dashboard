import { useLocalStorage } from '../../hooks/useLocalStorage';
import TimeSlot from './TimeSlot';

// One entry per hour of the day, e.g. "08:00" -> "5" (5 AM start feels more useful for a planner)
const HOURS = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

export default function DailyPlanner() {
  // Persisted object: { "08:00": "Team standup", "09:00": "", ... }
  const [plan, setPlan] = useLocalStorage('dashboard:daily-plan', {});
  const currentHour = `${String(new Date().getHours()).padStart(2, '0')}:00`;

  const updateSlot = (hour, text) => setPlan({ ...plan, [hour]: text });

  return (
    <div>
      <p className="status-text">Today's schedule — the current hour is highlighted.</p>
      <div className="planner-list">
        {HOURS.map((hour) => (
          <TimeSlot
            key={hour}
            hour={hour}
            value={plan[hour]}
            isCurrent={hour === currentHour}
            onChange={updateSlot}
          />
        ))}
      </div>
    </div>
  );
}
