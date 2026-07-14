import { FEATURES } from '../features';
import TodoList from './todo/TodoList';
import DailyPlanner from './planner/DailyPlanner';
import DailyGoals from './goals/DailyGoals';
import PomodoroTimer from './pomodoro/PomodoroTimer';
import MotivationQuote from './quote/MotivationQuote';
import WeatherWidget from './weather/WeatherWidget';

// Maps a feature id to its component. This is the ONLY place that needs
// to change when a new feature is added — everything else (Dashboard,
// App) works off the `features.js` config and this id.
const FEATURE_COMPONENTS = {
  todo: TodoList,
  planner: DailyPlanner,
  goals: DailyGoals,
  pomodoro: PomodoroTimer,
  quote: MotivationQuote,
  weather: WeatherWidget,
};

export default function FeatureView({ featureId, onBack }) {
  const meta = FEATURES.find((f) => f.id === featureId);
  const FeatureComponent = FEATURE_COMPONENTS[featureId];

  if (!FeatureComponent) return null;

  return (
    <div className="feature-view">
      <div className="feature-view__header">
        <button className="nb-btn nb-btn--ghost" onClick={onBack}>
          ← Back
        </button>
        <h2>{meta.title}</h2>
      </div>
      <div className="nb-panel" style={{ padding: '1.5rem' }}>
        <FeatureComponent />
      </div>
    </div>
  );
}
