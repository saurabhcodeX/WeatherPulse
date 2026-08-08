import {
  FiAlertTriangle,
  FiCloudRain,
  FiWind,
  FiSun,
  FiThermometer,
  FiActivity,
  FiCloudLightning,
} from 'react-icons/fi'

import { generateWeatherAlerts } from '../utils/weatherAlerts'

const WeatherAlerts = ({
  currentWeather,
  forecast,
  airQuality,
  uvIndex,
}) => {
  if (!currentWeather) {
    return null
  }

  const alerts = generateWeatherAlerts({
    currentWeather,
    forecast: forecast || [],
    airQuality,
    uvIndex,
  })

  const getAlertIcon = (type) => {
    switch (type) {
      case 'rain':
        return FiCloudRain

      case 'heat':
        return FiThermometer

      case 'wind':
        return FiWind

      case 'uv':
        return FiSun

      case 'air':
        return FiActivity

      case 'storm':
        return FiCloudLightning

      default:
        return FiAlertTriangle
    }
  }

  const getSeverityLabel = (severity) => {
    switch (severity) {
      case 'critical':
        return 'Critical'

      case 'high':
        return 'High'

      case 'moderate':
        return 'Moderate'

      default:
        return 'Notice'
    }
  }

  return (
    <section className="weather-alerts panel">

      <div className="section-heading">
        <div>
          <span className="eyebrow">
            WEATHER MONITOR
          </span>

          <h2>Smart Weather Alerts</h2>

          <p className="section-description">
            Important conditions detected from your
            current weather data.
          </p>
        </div>

        <div className="alerts-count">
          {alerts.length}
          <span>
            {alerts.length === 1
              ? ' alert'
              : ' alerts'}
          </span>
        </div>
      </div>

      {alerts.length === 0 ? (
        <div className="no-weather-alerts">
          <div className="no-alert-icon">
            <FiActivity />
          </div>

          <div>
            <strong>
              No active weather alerts
            </strong>

            <p>
              Current conditions look relatively
              stable. We'll highlight important
              changes automatically.
            </p>
          </div>
        </div>
      ) : (
        <div className="weather-alert-list">
          {alerts.map((alert, index) => {
            const Icon = getAlertIcon(alert.type)

            return (
              <article
                className={`weather-alert alert-${alert.severity}`}
                key={`${alert.type}-${index}`}
              >
                <div className="weather-alert-icon">
                  <Icon />
                </div>

                <div className="weather-alert-content">

                  <div className="weather-alert-header">
                    <div>
                      <span className="weather-alert-type">
                        {alert.type}
                      </span>

                      <h3>
                        {alert.title}
                      </h3>
                    </div>

                    <span className="weather-alert-severity">
                      {getSeverityLabel(
                        alert.severity
                      )}
                    </span>
                  </div>

                  <p className="weather-alert-message">
                    {alert.message}
                  </p>

                  <div className="weather-alert-recommendation">
                    <span>
                      Recommendation
                    </span>

                    <p>
                      {alert.recommendation}
                    </p>
                  </div>

                </div>
              </article>
            )
          })}
        </div>
      )}

    </section>
  )
}

export default WeatherAlerts