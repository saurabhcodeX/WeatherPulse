import { useWeather } from '../context/WeatherContext'
import { formatDay, formatTemperature, getDailyForecast } from '../utils/weatherUtils'
import WeatherIcon from './WeatherIcon'

const DailyForecast = ({ limit = 5 }) => {
  const { forecast, units } = useWeather()
  const days = getDailyForecast(forecast?.list || []).slice(0, limit)
  if (!days.length) return null
  return <section className="panel"><div className="section-heading"><div><span className="eyebrow">EXTENDED OUTLOOK</span><h2>Daily forecast</h2></div></div><div className="daily-list">{days.map((day, index) => <div className="daily-row" key={day.dt}><div className="day-name">{formatDay(day.dt, index)}</div><WeatherIcon weatherId={day.weather.id} size="sm" /><div className="day-condition">{day.weather.description}<small>{Math.round(day.pop * 100)}% precipitation</small></div><div className="day-range"><strong>{formatTemperature(day.max, units)}</strong><span>{formatTemperature(day.min, units)}</span></div></div>)}</div></section>
}
export default DailyForecast
