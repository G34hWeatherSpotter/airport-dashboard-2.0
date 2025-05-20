import React, { useState } from "react";

const AIRPORTS = [
  { name: "Heathrow (London, UK)", lat: 51.4706, lon: -0.4619 },
  { name: "Los Angeles Intl (LAX, USA)", lat: 33.9416, lon: -118.4085 },
  { name: "Frankfurt (Germany)", lat: 50.0379, lon: 8.5622 },
  { name: "Amsterdam Schiphol (Netherlands)", lat: 52.3105, lon: 4.7683 },
  { name: "Tokyo Haneda (Japan)", lat: 35.5494, lon: 139.7798 },
  { name: "Sydney Kingsford Smith (Australia)", lat: -33.9399, lon: 151.1753 }
];

function getWeatherUrl(lat, lon) {
  return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
}

export default function AirportWeather() {
  const [selected, setSelected] = useState(0);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    setWeather(null);
    try {
      const { lat, lon } = AIRPORTS[selected];
      const res = await fetch(getWeatherUrl(lat, lon));
      if (!res.ok) throw new Error("Weather not found");
      const data = await res.json();
      if (!data.current_weather) throw new Error("Weather not found");
      setWeather(data.current_weather);
    } catch {
      setError("Weather data unavailable for this airport.");
    }
    setLoading(false);
  };

  const weatherIcons = {
    0: "☀️",
    1: "🌤️", 2: "⛅", 3: "☁️",
    45: "🌫️", 48: "🌫️",
    51: "🌦️", 53: "🌦️", 55: "🌦️",
    61: "🌧️", 63: "🌧️", 65: "🌧️",
    71: "🌨️", 73: "🌨️", 75: "🌨️",
    80: "🌧️", 81: "🌧️", 82: "🌧️",
    95: "⛈️", 96: "⛈️", 99: "⛈️"
  };

  return (
    <div style={{ margin: "2rem 0" }}>
      <h2>Current Weather</h2>
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Choose airport:
          <select
            value={selected}
            onChange={e => setSelected(Number(e.target.value))}
            style={{ marginLeft: "1em" }}
          >
            {AIRPORTS.map((a, i) => (
              <option key={a.name} value={i}>{a.name}</option>
            ))}
          </select>
        </label>
        <button style={{ marginLeft: "1em" }} onClick={fetchWeather}>
          Get Weather
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div
          style={{
            background: "#f3f6fa",
            borderRadius: "8px",
            padding: "1em",
            maxWidth: "400px"
          }}
        >
          <span style={{ fontSize: "2em" }}>
            {weatherIcons[weather.weathercode] || "❓"}
          </span>
          <br />
          <strong>Temperature:</strong> {weather.temperature}°C
          <br />
          <strong>Windspeed:</strong> {weather.windspeed} km/h
          <br />
          <strong>Wind direction:</strong> {weather.winddirection}°
          <br />
          <strong>Weather code:</strong> {weather.weathercode}
        </div>
      )}
    </div>
  );
}
