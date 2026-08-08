# WeatherPulse

WeatherPulse is a React + Vite weather intelligence dashboard for live conditions, short-term trends, daily forecasts, air quality and saved locations.

## Features

- Current weather with location-aware loading
- City search and recent locations
- Metric / imperial units
- Hourly forecast timeline
- Temperature trend chart
- Multi-day forecast
- Air quality and pollutant summary
- Favorite locations stored locally
- Responsive dashboard layout
- OpenWeather API integration through an environment variable

## Run locally

1. Install Node.js 18+.
2. Create `.env` from `.env.example`.
3. Add your OpenWeather API key as `VITE_OPENWEATHER_API_KEY`.
4. Run:

```bash
npm install
npm run dev
```

For production verification:

```bash
npm run build
```

## Attribution / provenance

This project was rebuilt and substantially redesigned from an existing weather-monitoring codebase. Review the original repository license and preserve any required attribution before public redistribution. The API key is intentionally not committed; use your own key through `.env`.
