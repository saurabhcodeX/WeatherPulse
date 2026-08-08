# 🌦️ WeatherPulse

> Intelligent weather dashboard for real-time weather insights, forecasts, air quality, UV exposure, and smart weather alerts.

WeatherPulse is a modern React-based weather intelligence dashboard that goes beyond displaying temperature and forecasts. It combines live weather data with contextual analysis to help users understand current conditions and make better decisions about outdoor activities, travel, and weather-related risks.

## ✨ Features

### 🌤️ Live Weather
- Current temperature and weather conditions
- Feels-like temperature
- Humidity
- Atmospheric pressure
- Cloud coverage
- Wind speed
- Automatic location detection

### 📊 Weather Forecast
- Hourly weather forecast
- Multi-day forecast
- Temperature visualization
- Weather trend charts

### 🧠 Weather Intelligence
WeatherPulse analyzes live conditions and generates practical insights:

- Rain risk
- Outdoor activity suitability
- Travel conditions
- UV exposure
- Air quality assessment

### ☀️ Live UV Index
UV data is retrieved using location coordinates and displayed dynamically with the weather intelligence system.

### 🚨 Smart Weather Alerts
The application detects potentially important conditions such as:

- Heavy rain
- High temperature
- Extreme heat
- Strong winds
- High UV exposure
- Poor air quality
- Thunderstorms

Each alert includes a severity level and a practical recommendation.

### 🌫️ Air Quality
Displays air-quality information alongside weather conditions to help users understand outdoor environmental conditions.

### ⭐ Favorites & Recent Searches
- Save favorite cities
- Quickly access recently searched locations
- Persistent preferences using browser local storage

### 🌡️ Unit Switching
Switch between:

- Celsius
- Fahrenheit

### 📱 Responsive Interface
Designed to work across:

- Desktop
- Tablet
- Mobile

---

## 🛠️ Tech Stack

### Frontend

- React
- JavaScript
- React Router
- CSS
- React Icons
- Chart.js
- Framer Motion

### APIs

- OpenWeather API — weather, forecast, and air-quality data
- Open-Meteo API — UV index data

### Build Tools

- Vite
- npm
- ESLint

---

## 🏗️ Project Architecture

```text
WeatherPulse
│
├── public/
│   └── weather-icon.svg
│
├── src/
│   │
│   ├── api/
│   │   ├── weatherService.js
│   │   └── uvService.js
│   │
│   ├── components/
│   │   ├── AirQuality.jsx
│   │   ├── CurrentWeather.jsx
│   │   ├── DailyForecast.jsx
│   │   ├── Header.jsx
│   │   ├── HourlyForecast.jsx
│   │   ├── LocationInfo.jsx
│   │   ├── WeatherAlerts.jsx
│   │   ├── WeatherChart.jsx
│   │   ├── WeatherDetails.jsx
│   │   └── WeatherIntelligence.jsx
│   │
│   ├── context/
│   │   └── WeatherContext.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── ForecastPage.jsx
│   │
│   ├── utils/
│   │   ├── weatherAlerts.js
│   │   └── weatherIntelligence.js
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── .env.example
├── index.html
├── package.json
└── vite.config.js