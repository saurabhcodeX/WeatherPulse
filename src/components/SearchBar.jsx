import { useState } from 'react'
import { FiClock, FiSearch, FiX } from 'react-icons/fi'
import { useWeather } from '../context/WeatherContext'

const SearchBar = () => {
  const { searchCity, recentSearches, error, isLoading } = useWeather()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    if (!query.trim()) return
    await searchCity(query)
    setQuery('')
    setOpen(false)
  }

  return (
    <div className="search-wrap">
      <form className="search-box" onSubmit={submit}>
        <FiSearch />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Search city"
          aria-label="Search city"
        />
        {query && <button type="button" onClick={() => setQuery('')}><FiX /></button>}
      </form>
      {open && recentSearches.length > 0 && (
        <div className="search-menu">
          <div className="menu-label">Recent locations</div>
          {recentSearches.map((city) => (
            <button key={city} onClick={() => { searchCity(city); setOpen(false) }}>
              <FiClock /> {city}
            </button>
          ))}
        </div>
      )}
      {error && <div className="search-error">{error}</div>}
      {isLoading && <div className="search-loading">Updating forecast…</div>}
    </div>
  )
}

export default SearchBar
