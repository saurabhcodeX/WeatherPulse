import { NavLink } from 'react-router-dom'
import { FiCloud, FiGrid, FiMap, FiSettings } from 'react-icons/fi'
import SearchBar from './SearchBar'
import { useWeather } from '../context/WeatherContext'

const Header = () => {
  const { units, toggleUnits, currentWeather } = useWeather()
  const city = currentWeather?.name || 'Your location'

  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark"><FiCloud /></div>
        <div>
          <div className="brand-name">WeatherPulse</div>
          <div className="brand-tag">Live weather intelligence</div>
        </div>
      </div>

      <nav className="nav-links">
        <NavLink to="/" end><FiGrid /> Dashboard</NavLink>
        <NavLink to="/forecast"><FiMap /> Forecast</NavLink>
      </nav>

      <div className="header-actions">
        <div className="current-place">{city}</div>
        <SearchBar />
        <button className="unit-toggle" onClick={toggleUnits} title="Toggle units">
          {units === 'metric' ? '°C' : '°F'}
        </button>
        <div className="settings-dot" title="WeatherPulse settings"><FiSettings /></div>
      </div>
    </header>
  )
}

export default Header
