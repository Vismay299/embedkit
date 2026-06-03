"use client";

import { useState, useEffect } from "react";

interface WeatherForecastProps {
  location?: string;
  units?: string;
}

interface DayForecast {
  date: string;
  dayName: string;
  tempMax: number;
  tempMin: number;
  icon: string;
  code: number;
}

interface ForecastData {
  city: string;
  currentTemp: number;
  currentIcon: string;
  currentDesc: string;
  humidity: number;
  wind: number;
  days: DayForecast[];
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
  if (code <= 67) return "Rainy";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Showers";
  if (code <= 86) return "Heavy snow";
  return "Storm";
}

export default function WeatherForecastWidget({
  location = "New York",
  units = "metric",
}: WeatherForecastProps) {
  const [data, setData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchForecast() {
      try {
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`
        );
        const geoData = await geoRes.json();
        if (!geoData.results?.length) {
          setError(true);
          setLoading(false);
          return;
        }
        const { latitude, longitude, name } = geoData.results[0];

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7&temperature_unit=${units === "imperial" ? "fahrenheit" : "celsius"}`
        );
        const weatherData = await weatherRes.json();
        const current = weatherData.current;
        const daily = weatherData.daily;

        const days: DayForecast[] = daily.time.slice(0, 7).map((date: string, i: number) => {
          const d = new Date(date + "T12:00:00");
          return {
            date,
            dayName: i === 0 ? "Today" : d.toLocaleDateString("en-US", { weekday: "short" }),
            tempMax: Math.round(daily.temperature_2m_max[i]),
            tempMin: Math.round(daily.temperature_2m_min[i]),
            icon: getWeatherIcon(daily.weather_code[i]),
            code: daily.weather_code[i],
          };
        });

        setData({
          city: name,
          currentTemp: Math.round(current.temperature_2m),
          currentIcon: getWeatherIcon(current.weather_code),
          currentDesc: getWeatherDesc(current.weather_code),
          humidity: current.relative_humidity_2m,
          wind: Math.round(current.wind_speed_10m),
          days,
        });
      } catch {
        setError(true);
      }
      setLoading(false);
    }
    fetchForecast();
  }, [location, units]);

  const unitSymbol = units === "imperial" ? "°F" : "°C";

  if (loading) {
    return (
      <div style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "28px",
        background: "linear-gradient(135deg, #1e3a5f, #2d5a87)",
        borderRadius: "16px",
        width: "380px",
        color: "white",
        textAlign: "center",
      }}>
        Loading forecast...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "28px",
        background: "linear-gradient(135deg, #1e3a5f, #2d5a87)",
        borderRadius: "16px",
        width: "380px",
        color: "white",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "24px", marginBottom: "8px" }}>⚠️</div>
        <div style={{ fontSize: "13px", opacity: 0.8 }}>Forecast unavailable for {location}</div>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "28px",
      background: "linear-gradient(135deg, #1e3a5f, #2d5a87)",
      borderRadius: "16px",
      width: "380px",
      color: "white",
      boxShadow: "0 8px 32px rgba(30,58,95,0.4)",
    }}>
      {/* Current Weather */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <div style={{ fontSize: "14px", opacity: 0.7, marginBottom: "4px" }}>{data.city}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "42px" }}>{data.currentIcon}</span>
            <div>
              <div style={{ fontSize: "36px", fontWeight: 800, lineHeight: 1 }}>{data.currentTemp}{unitSymbol}</div>
              <div style={{ fontSize: "12px", opacity: 0.8 }}>{data.currentDesc}</div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "right", fontSize: "12px", opacity: 0.7 }}>
          <div>💧 {data.humidity}%</div>
          <div>💨 {data.wind} km/h</div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div style={{
        background: "rgba(255,255,255,0.1)",
        borderRadius: "12px",
        padding: "12px",
      }}>
        <div style={{ fontSize: "11px", fontWeight: 600, opacity: 0.6, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          7-Day Forecast
        </div>
        {data.days.map((day) => (
          <div key={day.date} style={{
            display: "flex",
            alignItems: "center",
            padding: "6px 0",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}>
            <div style={{ width: "50px", fontSize: "13px", fontWeight: 500 }}>{day.dayName}</div>
            <span style={{ fontSize: "18px", marginRight: "12px" }}>{day.icon}</span>
            <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", gap: "8px", fontSize: "13px" }}>
              <span style={{ opacity: 0.5 }}>{day.tempMin}°</span>
              <span style={{ fontWeight: 600 }}>{day.tempMax}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
