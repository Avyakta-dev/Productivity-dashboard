import { useState } from 'react';

const FALLBACK_COORDS = { lat: 51.5074, lon: -0.1278 }; // used if location is denied

function weatherCodeToText(code) {
  if (code === 0) return 'Clear sky';
  if ([1, 2, 3].includes(code)) return 'Partly cloudy';
  if ([45, 48].includes(code)) return 'Fog';
  if ([51, 53, 55, 61, 63, 65].includes(code)) return 'Rain';
  if ([71, 73, 75, 77].includes(code)) return 'Snow';
  if ([80, 81, 82].includes(code)) return 'Rain showers';
  if ([95, 96, 99].includes(code)) return 'Thunderstorm';
  return 'Unknown';
}

let hasFetchedWeather = false; // module flag: "has the first fetch happened?"

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'error' | 'done'

  const fetchWeather = (lat, lon) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then((data) => {
        setWeather(data.current_weather);
        setStatus('done');
      })
      .catch(() => setStatus('error'));
  };

  if (!hasFetchedWeather) {
    hasFetchedWeather = true; // only run this block on the very first render
    if (!navigator.geolocation) {
      fetchWeather(FALLBACK_COORDS.lat, FALLBACK_COORDS.lon);
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => fetchWeather(FALLBACK_COORDS.lat, FALLBACK_COORDS.lon)
      );
    }
  }

  if (status === 'loading') return <p className="status-text">Getting your local weather…</p>;
  if (status === 'error') return <p className="status-text">Weather is unavailable right now.</p>;

  return (
    <div className="weather-card">
      <div className="weather-main">
        <span className="weather-temp">{Math.round(weather.temperature)}°C</span>
        <span>{weatherCodeToText(weather.weathercode)}</span>
      </div>
      <div className="weather-grid">
        <div className="weather-stat">
          <span className="weather-stat__label">Wind</span>
          <span className="weather-stat__value">{weather.windspeed} km/h</span>
        </div>
        <div className="weather-stat">
          <span className="weather-stat__label">Direction</span>
          <span className="weather-stat__value">{weather.winddirection}°</span>
        </div>
      </div>
    </div>
  );
}