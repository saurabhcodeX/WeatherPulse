import { getWeatherEmoji } from '../utils/weatherUtils'

const WeatherIcon = ({ weatherId, size = 'md' }) => (
  <span className={`weather-emoji weather-emoji-${size}`} aria-hidden="true">{getWeatherEmoji(weatherId)}</span>
)

export default WeatherIcon
