import { useState } from 'react';

// Lives outside the component, at module scope — so it's created once
// when this file first loads, and stays alive for as long as the app
// runs. That's what lets it "remember" whether the clock has started.
let clockStarted = false;

export default function DateTimeDisplay() {
  const [now, setNow] = useState(new Date());

  if (!clockStarted) {
    clockStarted = true;
    setInterval(() => setNow(new Date()), 1000);
  }

  const time = now.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const date = now.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="datetime">
      <span className="datetime__time">{time}</span>
      <span className="datetime__date">{date}</span>
    </div>
  );
}