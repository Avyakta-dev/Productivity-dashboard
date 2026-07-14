import { useState } from 'react';

function getTimeCategory(hour) {
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

let bgTimerStarted = false; // module-scoped flag, same trick as DateTimeDisplay

export default function DynamicBackground({ children }) {
  const [category, setCategory] = useState(getTimeCategory(new Date().getHours()));

  if (!bgTimerStarted) {
    bgTimerStarted = true;
    // Recheck once a minute — cheap, and frequent enough not to miss a boundary.
    setInterval(() => {
      setCategory(getTimeCategory(new Date().getHours()));
    }, 60 * 1000);
  }

  return (
    <div className="app" data-time={category}>
      {children}
    </div>
  );
}