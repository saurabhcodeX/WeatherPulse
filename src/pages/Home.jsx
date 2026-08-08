import CurrentWeather from '../components/CurrentWeather'
import LocationInfo from '../components/LocationInfo'
import HourlyForecast from '../components/HourlyForecast'
import WeatherChart from '../components/WeatherChart'
import DailyForecast from '../components/DailyForecast'
import AirQuality from '../components/AirQuality'
import WeatherDetails from '../components/WeatherDetails'
import WeatherIntelligence from '../components/WeatherIntelligence'
import WeatherAlerts from '../components/WeatherAlerts'

import { useWeather } from '../context/WeatherContext'

const Home = () => {
  const {
    currentWeather,
    forecast,
    airQuality,
    uvIndex,
  } = useWeather()

  if (!currentWeather) {
    return null
  }

  return (
    <div className="dashboard">

      {/* Location */}
      <LocationInfo />

      {/* Current weather */}
      <CurrentWeather />

      {/* Main dashboard */}
      <div className="dashboard-grid">

        <div className="main-column">

          {/* Hourly forecast */}
          <HourlyForecast />

          {/* Temperature chart */}
          <WeatherChart />

          {/* Daily forecast */}
          <DailyForecast limit={5} />

        </div>

        <aside className="side-column">

          {/* Air quality */}
          <AirQuality />

          {/* Weather details */}
          <WeatherDetails />

        </aside>

      </div>

      {/* Weather Intelligence */}
      <WeatherIntelligence
        currentWeather={currentWeather}
        forecast={forecast?.list || []}
        airQuality={airQuality}
        uvIndex={uvIndex}
      />

      {/* Smart Weather Alerts */}
      <WeatherAlerts
        currentWeather={currentWeather}
        forecast={forecast?.list || []}
        airQuality={airQuality}
        uvIndex={uvIndex}
      />

    </div>
  )
}

export default Home