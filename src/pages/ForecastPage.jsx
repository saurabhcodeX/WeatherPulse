import DailyForecast from '../components/DailyForecast'
import WeatherChart from '../components/WeatherChart'
import { useWeather } from '../context/WeatherContext'

const ForecastPage = () => {
  const { currentWeather } = useWeather()
  if (!currentWeather) return null
  return <div className="forecast-page"><div className="page-heading"><span className="eyebrow">FORECAST CENTER</span><h1>Plan the next few days.</h1><p>Use the trend and daily outlook to understand how conditions are expected to evolve.</p></div><WeatherChart /><DailyForecast limit={5} /></div>
}
export default ForecastPage
