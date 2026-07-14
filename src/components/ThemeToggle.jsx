import { useLocalStorage } from '../hooks/useLocalStorage';

export default function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    // Apply it directly here, right when it changes — no need to "watch"
    // for the change separately, since this click is the only place
    // theme ever changes.
    document.documentElement.setAttribute('data-theme', next);
    setTheme(next);
  };

  return (
    <button className="nb-btn nb-btn--ghost" onClick={toggle}>
      {theme === 'dark' ? '☀ Light' : '● Dark'}
    </button>
  );
}