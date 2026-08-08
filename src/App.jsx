import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import ForecastPage from './pages/ForecastPage'
import { useWeather } from './context/WeatherContext'
import './App.css'

const App = () => {
  const { currentWeather, fetchWeatherByCoords, isLoading, error } = useWeather()
  const [locationMessage, setLocationMessage] = useState('')

  useEffect(() => {
    if (currentWeather) return
    if (!navigator.geolocation) {
      setLocationMessage('Location access is unavailable. Search for a city to begin.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => fetchWeatherByCoords(coords.latitude, coords.longitude).catch(() => {}),
      () => setLocationMessage('Location permission was not granted. Search for a city to begin.'),
      { timeout: 8000 }
    )
  }, [currentWeather, fetchWeatherByCoords])

  return <div className="app-shell"><div className="ambient ambient-one"></div><div className="ambient ambient-two"></div><Header /><main className="app-main">{locationMessage && !currentWeather && <div className="empty-state"><div className="empty-icon">☁️</div><h1>Start with a location</h1><p>{locationMessage}</p><div className="empty-hint">Try searching for Delhi, Chandigarh, Mumbai, or any city.</div></div>}{error && !currentWeather && <div className="empty-state"><h1>Weather data unavailable</h1><p>{error}</p></div>}{isLoading && !currentWeather ? <div className="loading-screen"><div className="loader"></div><p>Loading live conditions…</p></div> : currentWeather && <Routes><Route path="/" element={<Home />} /><Route path="/forecast" element={<ForecastPage />} /></Routes>}</main><footer className="footer"><span>WeatherPulse</span><span>Live weather dashboard · Built with React + OpenWeather</span></footer></div>
}
export default App
