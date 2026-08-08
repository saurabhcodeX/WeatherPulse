import {
  FiCloudRain,
  FiSun,
  FiWind,
  FiNavigation,
  FiActivity,
} from 'react-icons/fi'

import { generateWeatherIntelligence } from '../utils/weatherIntelligence'

const WeatherIntelligence = ({
  currentWeather,
  forecast,
  airQuality,
  uvIndex,
}) => {
  if (!currentWeather) {
    return null
  }

  const intelligence = generateWeatherIntelligence({
    currentWeather,
    forecast: forecast || [],
    airQuality,
    uvIndex,
  })

  if (!intelligence) {
    return null
  }

  const cards = [
    {
      title: 'Rain Risk',
      value: `${intelligence.rain.percentage}%`,
      status: intelligence.rain.level,
      message: intelligence.rain.message,
      icon: FiCloudRain,
    },
    {
      title: 'Outdoor Activity',
      value: intelligence.outdoor.status,
      status: intelligence.outdoor.status,
      message: intelligence.outdoor.message,
      icon: FiActivity,
    },
    {
      title: 'Travel Conditions',
      value: intelligence.travel.status,
      status: intelligence.travel.status,
      message: intelligence.travel.message,
      icon: FiNavigation,
    },
    {
      title: 'UV Exposure',
      value: intelligence.uv.level,
      status: intelligence.uv.level,
      message: intelligence.uv.message,
      icon: FiSun,
    },
    {
      title: 'Air Quality',
      value: intelligence.air.level,
      status: intelligence.air.level,
      message: intelligence.air.message,
      icon: FiWind,
    },
  ]

  return (
    <section className="intelligence-panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            SMART ANALYSIS
          </span>

          <h2>Weather Intelligence</h2>

          <p className="section-description">
            Real-time recommendations based on current
            weather conditions.
          </p>
        </div>
      </div>

      <div className="intelligence-grid">
        {cards.map((card) => {
          const Icon = card.icon

          const statusClass = String(card.status || 'unknown')
            .toLowerCase()
            .replace(/\s+/g, '-')

          return (
            <article
              className="intelligence-card"
              key={card.title}
            >
              <div className="intelligence-card-top">
                <div className="intelligence-icon">
                  <Icon />
                </div>

                <span
                  className={`intelligence-status status-${statusClass}`}
                >
                  {card.status}
                </span>
              </div>

              <div className="intelligence-card-content">
                <span className="intelligence-label">
                  {card.title}
                </span>

                <strong className="intelligence-value">
                  {card.value}
                </strong>

                <p>{card.message}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default WeatherIntelligence