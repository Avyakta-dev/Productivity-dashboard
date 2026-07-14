import { useState } from 'react';
import Dashboard from './components/Dashboard';
import FeatureView from './components/FeatureView';
import ThemeToggle from './components/ThemeToggle';
import DateTimeDisplay from './components/DateTimeDisplay';
import DynamicBackground from './components/DynamicBackground';

function App() {
  // null = dashboard is showing. Any feature id = that feature is open,
  // full-screen. This single variable is the entire navigation state —
  // it's impossible for two features to be open at once.
  const [activeFeature, setActiveFeature] = useState(null);

  return (
    <DynamicBackground>
      <header className="topbar">
        <span className="topbar__brand">My Productivity Dashboard</span>
        <div className="topbar__right">
          <DateTimeDisplay />
          <ThemeToggle />
        </div>
      </header>

      <main>
        {activeFeature === null ? (
          <Dashboard onSelect={setActiveFeature} />
        ) : (
          <FeatureView featureId={activeFeature} onBack={() => setActiveFeature(null)} />
        )}
      </main>
    </DynamicBackground>
  );
}

export default App;