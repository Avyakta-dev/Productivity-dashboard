import { FEATURES } from '../features';

// The home screen: one clickable card per feature. Clicking a card just
// tells the parent (App) which feature id was selected — App decides
// what to render. This component doesn't know or care what happens next.
export default function Dashboard({ onSelect }) {
  return (
    <div>
      <h2>Your Dashboard</h2>
      <div className="dashboard-grid">
        {FEATURES.map((f) => (
          <button
            key={f.id}
            className="feature-card"
            onClick={() => onSelect(f.id)}
          >
            <span className="feature-card__icon">{f.icon}</span>
            <span className="feature-card__title">{f.title}</span>
            <p className="feature-card__desc">{f.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
