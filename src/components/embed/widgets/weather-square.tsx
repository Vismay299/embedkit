"use client";

import { useState, useEffect } from "react";

interface WeatherSquareProps {
  location?: string;
}

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  city: string;
  humidity: number;
  wind: number;
  country: string;
}

const WEATHER_ICONS: Record<string, string> = {
  clear: "☀️",
  partly_cloudy: "⛅",
  cloudy: "☁️",
  fog: "🌫️",
  drizzle: "🌦️",
  rain: "🌧️",
  snow: "❄️",
  thunderstorm: "⛈️",
};

function getWeatherIcon(code: number): string {
  if (code === 0) return WEATHER_ICONS.clear;
  if (code <= 3) return WEATHER_ICONS.partly_cloudy;
  if (code <= 48) return WEATHER_ICONS.fog;
  if (code <= 57) return WEATHER_ICONS.drizzle;
  if (code <= 67) return WEATHER_ICONS.rain;
  if (code <= 77) return WEATHER_ICONS.snow;
  if (code <= 82) return WEATHER_ICONS.rain;
  if (code <= 86) return WEATHER_ICONS.snow;
  return WEATHER_ICONS.thunderstorm;
}

function getWeatherDesc(code: number): string {
  if (code === 0) return "Clear sky";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Heavy rain";
  if (code <= 86) return "Heavy snow";
  return "Thunderstorm";
}

export default function WeatherSquareWidget({ location = "Tokyo" }: WeatherSquareProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`
        );
        const geoData = await geoRes.json();
        if (!geoData.results || geoData.results.length === 0) {
          setError(true);
          setLoading(false);
          return;
        }
        const { latitude, longitude, name, country } = geoData.results[0];

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=celsius`
        );
        const weatherData = await weatherRes.json();
        const current = weatherData.current;

        setWeather({
          temp: Math.round(current.temperature_2m),
          description: getWeatherDesc(current.weather_code),
          icon: getWeatherIcon(current.weather_code),
          city: name,
          country: country || "",
          humidity: current.relative_humidity_2m,
          wind: Math.round(current.wind_speed_10m),
        });
      } catch {
        setError(true);
      }
      setLoading(false);
    }
    fetchWeather();
  }, [location]);

  if (loading) {
    return (
      <div style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "24px",
        background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
        borderRadius: "16px",
        width: "260px",
        color: "white",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "14px" }}>Loading weather...</div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "24px",
        background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
        borderRadius: "16px",
        width: "260px",
        color: "white",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "24px", marginBottom: "8px" }}>⚠️</div>
        <div style={{ fontSize: "13px", opacity: 0.8 }}>Weather unavailable for {location}</div>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "24px",
      background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
      borderRadius: "16px",
      width: "260px",
      color: "white",
      boxShadow: "0 8px 32px rgba(14,165,233,0.3)",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <div>
          <div style={{ fontSize: "16px", fontWeight: 700 }}>{weather.city}</div>
          <div style={{ fontSize: "11px", opacity: 0.8 }}>{weather.country}</div>
        </div>
        <span style={{ fontSize: "36px" }}>{weather.icon}</span>
      </div>

      {/* Temperature */}
      <div style={{ fontSize: "48px", fontWeight: 800, lineHeight: 1, marginBottom: "8px" }}>
        {weather.temp}°C
      </div>
      <div style={{ fontSize: "13px", opacity: 0.85, marginBottom: "16px" }}>
        {weather.description}
      </div>

      {/* Details */}
      <div style={{
        display: "flex",
        gap: "16px",
        padding: "12px",
        background: "rgba(255,255,255,0.15)",
        borderRadius: "10px",
      }}>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontSize: "10px", opacity: 0.7, marginBottom: "2px" }}>Humidity</div>
          <div style={{ fontSize: "14px", fontWeight: 700 }}>{weather.humidity}%</div>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontSize: "10px", opacity: 0.7, marginBottom: "2px" }}>Wind</div>
          <div style={{ fontSize: "14px", fontWeight: 700 }}>{weather.wind} km/h</div>
        </div>
      </div>
    </div>
  );
}
