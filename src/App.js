import React from "react";
import AirportWebcam from "./components/AirportWebcam";
import AirportRadar from "./components/AirportRadar";
import AirportWeather from "./components/AirportWeather";

function App() {
  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 900, margin: "0 auto", padding: "2rem" }}>
      <h1>Airport Dashboard</h1>
      <p>
        Live airport webcam, radar, and weather in one place.
      </p>
      <AirportWebcam />
      <AirportRadar />
      <AirportWeather />
    </div>
  );
}

export default App;
