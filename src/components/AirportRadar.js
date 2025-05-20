import React from "react";

export default function AirportRadar() {
  return (
    <div style={{ margin: "2rem 0" }}>
      <h2>Live Flight Radar</h2>
      <div style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}>
        <iframe
          title="ADSBexchange Globe"
          src="https://globe.adsbexchange.com/"
          width="100%"
          height="500"
          style={{ border: 0, borderRadius: "8px", minHeight: 400 }}
          allowFullScreen
        />
      </div>
      <p style={{ fontSize: "0.95em", color: "#555", marginTop: "0.5em" }}>
        Data source: <a href="https://globe.adsbexchange.com/" target="_blank" rel="noopener noreferrer">ADSBexchange Globe</a>
      </p>
    </div>
  );
}
