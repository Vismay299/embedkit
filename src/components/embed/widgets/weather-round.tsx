"use client";

import { useState, useEffect } from "react";

interface WeatherRoundProps {
  location?: string;
}

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  city: string;
  humidity: number;
  wind: number;
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

export default function WeatherRoundWidget({ location = "London" }: WeatherRoundProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchWeather() {
      try {
        // Geocode the location
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`
        );
        const geoData = await geoRes.json();
        if (!geoData.results || geoData.results.length === 0) {
          setError(true);
          setLoading(false);
          return;
        }
        const { latitude, longitude, name } = geoData.results[0];

        // Fetch current weather
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
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        borderRadius: "50%",
        width: "220px",
        height: "220px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}>
        <span style={{ fontSize: "14px" }}>Loading...</span>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "24px",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        borderRadius: "50%",
        width: "220px",
        height: "220px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
      }}>
        <div>
          <div style={{ fontSize: "24px", marginBottom: "8px" }}>⚠️</div>
          <div style={{ fontSize: "13px", opacity: 0.8 }}>Weather unavailable</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "20px",
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      borderRadius: "50%",
      width: "220px",
      height: "220px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      textAlign: "center",
      boxShadow: "0 8px 32px rgba(102,126,234,0.3)",
    }}>
      <div style={{ fontSize: "36px", marginBottom: "4px" }}>{weather.icon}</div>
      <div style={{ fontSize: "32px", fontWeight: 800, lineHeight: 1 }}>{weather.temp}°</div>
      <div style={{ fontSize: "11px", opacity: 0.85, marginTop: "4px" }}>{weather.city}</div>
      <div style={{ fontSize: "10px", opacity: 0.7, marginTop: "2px" }}>{weather.description}</div>
    </div>
  );
}
