import { FiActivity, FiWind } from 'react-icons/fi'
import { useWeather } from '../context/WeatherContext'
import { getAqiMeta } from '../utils/weatherUtils'

const AirQuality = () => {
  const { airQuality } = useWeather()
  if (!airQuality) return <section className="panel"><div className="section-heading"><div><span className="eyebrow">ENVIRONMENT</span><h2>Air quality</h2></div></div><p className="muted">Air quality data is unavailable for this location.</p></section>
  const meta = getAqiMeta(airQuality.main.aqi)
  return <section className="panel"><div className="section-heading"><div><span className="eyebrow">ENVIRONMENT</span><h2>Air quality</h2></div><FiActivity className="panel-icon" /></div><div className="aqi-layout"><div className="aqi-score"><strong>{airQuality.main.aqi}</strong><span>{meta.label}</span></div><div className="aqi-copy"><p>{meta.hint}</p><div className="pollutants"><span><FiWind /> PM2.5<strong>{airQuality.components.pm2_5.toFixed(1)}</strong></span><span><FiWind /> PM10<strong>{airQuality.components.pm10.toFixed(1)}</strong></span><span><FiWind /> NO₂<strong>{airQuality.components.no2.toFixed(1)}</strong></span></div></div></div></section>
}
export default AirQuality
