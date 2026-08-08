import { FiHeart, FiMapPin, FiNavigation } from 'react-icons/fi'
import { useWeather } from '../context/WeatherContext'

const LocationInfo = () => {
  const { currentWeather, favorites, toggleFavorite, fetchWeatherByCoords } = useWeather()
  if (!currentWeather) return null
  const saved = favorites.includes(currentWeather.name)
  return <div className="location-bar"><div><span className="location-kicker"><FiMapPin /> ACTIVE LOCATION</span><div className="location-name">{currentWeather.name}, {currentWeather.sys.country}</div></div><div className="location-actions"><button className={saved ? 'favorite active' : 'favorite'} onClick={() => toggleFavorite(currentWeather.name)}><FiHeart /> {saved ? 'Saved' : 'Save'}</button><button className="locate-btn" onClick={() => navigator.geolocation?.getCurrentPosition((p) => fetchWeatherByCoords(p.coords.latitude, p.coords.longitude))}><FiNavigation /> Use my location</button></div></div>
}
export default LocationInfo
