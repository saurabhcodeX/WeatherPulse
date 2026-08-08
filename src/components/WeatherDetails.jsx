import {
  FiBarChart2,
  FiCloud,
  FiDroplet,
  FiActivity,
  FiThermometer,
  FiWind,
} from 'react-icons/fi'

import { useWeather } from '../context/WeatherContext'
import {
  formatTemperature,
  formatWindSpeed,
} from '../utils/weatherUtils'

const WeatherDetails = () => {
  const { currentWeather, units } = useWeather()

  // Don't render anything until weather data is available
  if (!currentWeather) {
    return null
  }

  const { main, wind, clouds } = currentWeather

  const items = [
    [
      'Feels like',
      formatTemperature(main.feels_like, units),
      FiThermometer,
    ],
    [
      'Humidity',
      `${main.humidity}%`,
      FiDroplet,
    ],
    [
      'Wind',
      formatWindSpeed(wind.speed, units),
      FiWind,
    ],
    [
      'Pressure',
      `${main.pressure} hPa`,
      FiActivity,
    ],
    [
      'Cloud cover',
      `${clouds.all}%`,
      FiCloud,
    ],
    [
      'Ground pressure',
      `${main.grnd_level || main.pressure} hPa`,
      FiBarChart2,
    ],
  ]

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">DIAGNOSTICS</span>
          <h2>Weather details</h2>
        </div>
      </div>

      <div className="metrics-grid">
        {items.map(([label, value, Icon]) => (
          <div className="metric" key={label}>
            <div className="metric-icon">
              <Icon />
            </div>

            <div className="metric-content">
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WeatherDetails