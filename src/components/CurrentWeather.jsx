import { FiDroplet, FiEye, FiSun, FiWind } from 'react-icons/fi'
import { useWeather } from '../context/WeatherContext'
import { formatTemperature, formatTime, formatWindSpeed } from '../utils/weatherUtils'
import WeatherIcon from './WeatherIcon'

const CurrentWeather = () => {
  const { currentWeather, units } = useWeather()
  if (!currentWeather) return null

  const { main, wind, weather, sys, visibility } = currentWeather
  const sunrise = formatTime(sys.sunrise)
  const sunset = formatTime(sys.sunset)

  return (
    <section className="hero-card">
      <div className="hero-copy">
        <div className="eyebrow">CURRENT CONDITIONS</div>
        <h1>{currentWeather.name}<span>, {sys.country}</span></h1>
        <p className="condition">{weather[0].description}</p>
        <div className="hero-temp-row">
          <div className="hero-temp">{formatTemperature(main.temp, units)}</div>
          <div className="hero-feels">Feels like {formatTemperature(main.feels_like, units)}</div>
        </div>
        <div className="hero-mini-grid">
          <div><FiDroplet /><span>Humidity<strong>{main.humidity}%</strong></span></div>
          <div><FiWind /><span>Wind<strong>{formatWindSpeed(wind.speed, units)}</strong></span></div>
          <div><FiEye /><span>Visibility<strong>{(visibility / 1000).toFixed(1)} km</strong></span></div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="sun-orbit"></div>
        <WeatherIcon weatherId={weather[0].id} size="xl" />
        <div className="sun-times">
          <span><FiSun /> {sunrise}</span>
          <span><FiSun /> {sunset}</span>
        </div>
      </div>
    </section>
  )
}

export default CurrentWeather
