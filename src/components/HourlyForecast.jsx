import { useWeather } from '../context/WeatherContext'
import { formatTemperature } from '../utils/weatherUtils'
import WeatherIcon from './WeatherIcon'

const HourlyForecast = () => {
  const { forecast, units } = useWeather()
  if (!forecast?.list?.length) return null

  return (
    <section className="panel">
      <div className="section-heading"><div><span className="eyebrow">NEXT 24 HOURS</span><h2>Hourly outlook</h2></div><span className="muted">3-hour intervals</span></div>
      <div className="hourly-strip">
        {forecast.list.slice(0, 8).map((item, index) => (
          <div className={`hour-item ${index === 0 ? 'active' : ''}`} key={item.dt}>
            <span>{index === 0 ? 'Now' : new Date(item.dt * 1000).toLocaleTimeString([], { hour: 'numeric' })}</span>
            <WeatherIcon weatherId={item.weather[0].id} size="sm" />
            <strong>{formatTemperature(item.main.temp, units)}</strong>
            <small>{Math.round((item.pop || 0) * 100)}% rain</small>
          </div>
        ))}
      </div>
    </section>
  )
}
export default HourlyForecast
