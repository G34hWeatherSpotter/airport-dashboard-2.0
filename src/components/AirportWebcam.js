import React, { useState } from "react";

const WEBCAMS = [
  { name: "Heathrow (London, UK)", url: "https://www.youtube.com/embed/B8HS5FjvGqk" },
  { name: "Los Angeles Intl (LAX, USA)", url: "https://www.youtube.com/embed/2IM1Zgk2nAE" },
  { name: "Frankfurt (Germany)", url: "https://www.youtube.com/embed/4j7I4K9Xc0g" },
  { name: "Amsterdam Schiphol (Netherlands)", url: "https://www.youtube.com/embed/7xkJ-2ZC4mA" },
  { name: "Tokyo Haneda (Japan)", url: "https://www.youtube.com/embed/NyD2A3nav7A" },
  { name: "Sydney Kingsford Smith (Australia)", url: "https://www.youtube.com/embed/iQ4bR9F5s-Y" }
];

function getYouTubeSearchUrl(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query + " airport live cam")}`;
}

export default function AirportWebcam() {
  const [selected, setSelected] = useState(0);
  const [customSearch, setCustomSearch] = useState("");
  const [customMode, setCustomMode] = useState(false);

  function handleSearch(e) {
    e.preventDefault();
    setCustomMode(true);
  }

  return (
    <div style={{ margin: "2rem 0" }}>
      <h2>Airport Webcam</h2>
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Choose airport:
          <select
            value={selected}
            onChange={e => {
              setSelected(Number(e.target.value));
              setCustomMode(false);
            }}
            style={{ marginLeft: "1em" }}
          >
            {WEBCAMS.map((cam, i) => (
              <option key={cam.url} value={i}>{cam.name}</option>
            ))}
            <option value="-1">Other airport...</option>
          </select>
        </label>
      </div>
      {selected === -1 ? (
        <form onSubmit={handleSearch} style={{ marginBottom: "1em" }}>
          <input
            type="text"
            value={customSearch}
            onChange={e => setCustomSearch(e.target.value)}
            placeholder="Enter airport or city (e.g. Denver, JFK, Dubai...)"
            style={{ width: "60%" }}
          />
          <button type="submit">Search</button>
        </form>
      ) : null}
      {customMode && customSearch ? (
        <div>
          <p>
            No direct webcam found. Try searching for live cams here:{" "}
            <a href={getYouTubeSearchUrl(customSearch)} target="_blank" rel="noopener noreferrer">
              YouTube search for "{customSearch} airport live cam"
            </a>
          </p>
        </div>
      ) : (
        <div style={{ width: "100%", maxWidth: 640, margin: "0 auto" }}>
          <iframe
            width="100%"
            height="360"
            src={WEBCAMS[selected]?.url}
            title={WEBCAMS[selected]?.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ display: selected !== -1 ? "block" : "none" }}
          />
        </div>
      )}
    </div>
  );
}
