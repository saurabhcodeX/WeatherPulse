export const temperatureUnit = (units) => units === 'metric' ? '°C' : '°F'

export const formatTemperature = (value, units) => `${Math.round(value)}${temperatureUnit(units)}`

export const formatWindSpeed = (value, units) => {
  if (units === 'imperial') return `${Math.round(value)} mph`
  return `${Math.round(value * 3.6)} km/h`
}

export const formatTime = (timestamp) => new Date(timestamp * 1000).toLocaleTimeString([], {
  hour: 'numeric', minute: '2-digit'
})

export const formatDay = (timestamp, index = 0) => {
  if (index === 0) return 'Today'
  return new Date(timestamp * 1000).toLocaleDateString([], { weekday: 'short' })
}

export const groupForecastByDay = (list = []) => list.reduce((groups, item) => {
  const key = new Date(item.dt * 1000).toLocaleDateString()
  groups[key] ||= []
  groups[key].push(item)
  return groups
}, {})

export const getDailyForecast = (list = []) => Object.values(groupForecastByDay(list)).map((items) => {
  const temps = items.map((item) => item.main.temp)
  const midday = items.reduce((closest, item) => {
    const hour = new Date(item.dt * 1000).getHours()
    return Math.abs(hour - 12) < Math.abs(new Date(closest.dt * 1000).getHours() - 12) ? item : closest
  }, items[0])
  return {
    dt: midday.dt,
    min: Math.min(...temps),
    max: Math.max(...temps),
    weather: midday.weather[0],
    pop: Math.max(...items.map((item) => item.pop || 0)),
  }
})

export const getAqiMeta = (value) => {
  const map = {
    1: { label: 'Good', hint: 'Air quality is ideal for outdoor activity.' },
    2: { label: 'Fair', hint: 'Generally acceptable air quality.' },
    3: { label: 'Moderate', hint: 'Sensitive groups should reduce prolonged exposure.' },
    4: { label: 'Poor', hint: 'Consider limiting strenuous outdoor activity.' },
    5: { label: 'Very poor', hint: 'Avoid prolonged outdoor exposure where possible.' },
  }
  return map[value] || { label: 'Unknown', hint: 'Air quality data is unavailable.' }
}

export const getWeatherEmoji = (id) => {
  if (id >= 200 && id < 300) return '⛈️'
  if (id >= 300 && id < 600) return '🌧️'
  if (id >= 600 && id < 700) return '❄️'
  if (id >= 700 && id < 800) return '🌫️'
  if (id === 800) return '☀️'
  if (id > 800) return '☁️'
  return '🌤️'
}
