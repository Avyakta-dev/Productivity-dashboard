import { useState } from 'react';

const WORK_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

// Module-scoped box to hold the current interval's ID, so start/pause/reset
// can all reach the same value without a hook. Only safe because this
// component is only ever rendered once in the app (see note below).
let intervalId = null;

export default function PomodoroTimer() {
  const [secondsLeft, setSecondsLeft] = useState(WORK_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [session, setSession] = useState('work'); // 'work' | 'break'

  const start = () => {
    if (intervalId) return; // already running — don't start a second interval
    setIsRunning(true);
    intervalId = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          intervalId = null;
          const nextSession = session === 'work' ? 'break' : 'work';
          setSession(nextSession);
          setIsRunning(false); // pause between sessions; user starts the next one
          return nextSession === 'work' ? WORK_SECONDS : BREAK_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pause = () => {
    clearInterval(intervalId);
    intervalId = null;
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(intervalId);
    intervalId = null;
    setIsRunning(false);
    setSession('work');
    setSecondsLeft(WORK_SECONDS);
  };

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div className="pomodoro">
      <span className="pomodoro__session">
        {session === 'work' ? 'Work Session' : 'Break'}
      </span>
      <div className="pomodoro__clock">{minutes}:{seconds}</div>
      <div className="pomodoro__controls">
        <button className="nb-btn" onClick={start} disabled={isRunning}>
          Start
        </button>
        <button className="nb-btn nb-btn--ghost" onClick={pause} disabled={!isRunning}>
          Pause
        </button>
        <button className="nb-btn nb-btn--danger" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}