# Productivity Dashboard (React)

A single-page productivity dashboard built in React: Todo List, Daily Planner,
Daily Goals, Pomodoro Timer, Motivation Quotes, Weather, live Date/Time,
a time-of-day background tint, and a Light/Dark theme toggle.

Design: neobrutalism — thick borders, hard offset shadows, flat color blocks —
built entirely from this palette: `#F3E5AB` `#A3C6A8` `#6B8E23` `#D9CBAE` `#4F7942`.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Project structure

```
src/
  hooks/
    useLocalStorage.js   # persist any piece of state to localStorage
    useInterval.js       # declarative setInterval, used by clock + pomodoro
  components/
    Dashboard.jsx         # home screen grid of feature cards
    FeatureView.jsx        # full-screen wrapper for whichever feature is open
    ThemeToggle.jsx
    DateTimeDisplay.jsx
    DynamicBackground.jsx
    todo/       DailyPlanner-style Todo feature
    planner/    Daily Planner feature
    goals/      Daily Goals feature
    pomodoro/   Pomodoro Timer feature
    quote/      Motivation Quote feature (fetch API)
    weather/    Weather Widget feature (geolocation + fetch API)
  features.js   # single list of feature metadata used by Dashboard + FeatureView
  App.jsx       # navigation state (which feature is open)
  index.css     # design tokens + neobrutalist component styles
```

## Notes

- No API keys required — quotes come from `api.quotable.io`, weather from
  `api.open-meteo.com`. Both are free and keyless, good for learning.
- All persisted data (tasks, plan, goals, theme) lives in `localStorage` under
  keys prefixed `dashboard:`.
