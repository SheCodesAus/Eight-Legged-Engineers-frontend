import { useEffect, useState } from "react";
import "./WeatherBadge.css";

function WeatherBadge() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );

      const data = await response.json();
      if (data.main) setWeather(data);
    });
  }, []);

  if (!weather) return null;

  return (
    <div className="weather-badge">
      <span>☀️</span>
      <span>{Math.round(weather.main.temp)}°</span>
    </div>
  );
}

export default WeatherBadge;