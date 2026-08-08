import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  getWeatherBundleByCity,
  getWeatherBundleByCoords,
} from '../api/weatherService'

import { getUVIndex } from '../api/uvService'

const WeatherContext = createContext(null)

const STORAGE_KEY = 'weatherpulse.preferences'

export const useWeather = () => {
  const context = useContext(WeatherContext)

  if (!context) {
    throw new Error(
      'useWeather must be used inside WeatherProvider'
    )
  }

  return context
}

export const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [airQuality, setAirQuality] = useState(null)

  // NEW: UV index
  const [uvIndex, setUvIndex] = useState(null)

  const [units, setUnits] = useState('metric')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [recentSearches, setRecentSearches] = useState([])
  const [favorites, setFavorites] = useState([])

  // --------------------------------------------------
  // Load saved preferences
  // --------------------------------------------------

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || '{}'
      )

      setRecentSearches(
        Array.isArray(saved.recentSearches)
          ? saved.recentSearches
          : []
      )

      setFavorites(
        Array.isArray(saved.favorites)
          ? saved.favorites
          : []
      )

      setUnits(
        saved.units === 'imperial'
          ? 'imperial'
          : 'metric'
      )
    } catch {
      // Ignore malformed local preferences.
    }
  }, [])

  // --------------------------------------------------
  // Save preferences
  // --------------------------------------------------

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        recentSearches,
        favorites,
        units,
      })
    )
  }, [recentSearches, favorites, units])

  // --------------------------------------------------
  // Apply weather bundle
  // --------------------------------------------------

  const applyBundle = useCallback((bundle) => {
    setCurrentWeather(bundle.current)
    setForecast(bundle.forecast)
    setAirQuality(bundle.air)

    // ----------------------------------------------
    // Get UV index using coordinates
    // ----------------------------------------------

    if (bundle.current?.coord) {
      const { lat, lon } = bundle.current.coord

      getUVIndex(lat, lon)
        .then((value) => {
          setUvIndex(value)
        })
        .catch((err) => {
          console.error('UV API Error:', err)
          setUvIndex(null)
        })
    } else {
      setUvIndex(null)
    }
  }, [])

  // --------------------------------------------------
  // Request handler
  // --------------------------------------------------

  const runRequest = useCallback(
    async (request) => {
      setIsLoading(true)
      setError('')

      try {
        const bundle = await request()

        applyBundle(bundle)

        const city = bundle.current.name

        setRecentSearches((items) =>
          [
            city,
            ...items.filter(
              (item) => item !== city
            ),
          ].slice(0, 6)
        )

        return bundle
      } catch (err) {
        setError(
          err.message ||
            'Unable to load weather data.'
        )

        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [applyBundle]
  )

  // --------------------------------------------------
  // Search city
  // --------------------------------------------------

  const searchCity = useCallback(
    (city) => {
      const value = city.trim()

      if (!value) {
        return Promise.resolve()
      }

      return runRequest(() =>
        getWeatherBundleByCity(
          value,
          units
        )
      )
    },
    [runRequest, units]
  )

  // --------------------------------------------------
  // Fetch weather by coordinates
  // --------------------------------------------------

  const fetchWeatherByCoords = useCallback(
    (lat, lon) =>
      runRequest(() =>
        getWeatherBundleByCoords(
          lat,
          lon,
          units
        )
      ),
    [runRequest, units]
  )

  // --------------------------------------------------
  // Toggle Celsius / Fahrenheit
  // --------------------------------------------------

  const toggleUnits = useCallback(() => {
    setUnits((previous) =>
      previous === 'metric'
        ? 'imperial'
        : 'metric'
    )
  }, [])

  // --------------------------------------------------
  // Refresh weather after unit change
  // --------------------------------------------------

  useEffect(() => {
    if (!currentWeather) return

    const { lat, lon } =
      currentWeather.coord

    runRequest(() =>
      getWeatherBundleByCoords(
        lat,
        lon,
        units
      )
    ).catch(() => {})

    // Intentionally run only when units change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units])

  // --------------------------------------------------
  // Toggle favorite city
  // --------------------------------------------------

  const toggleFavorite = useCallback(
    (city) => {
      setFavorites((items) =>
        items.includes(city)
          ? items.filter(
              (item) => item !== city
            )
          : [city, ...items].slice(0, 8)
      )
    },
    []
  )

  // --------------------------------------------------
  // Context value
  // --------------------------------------------------

  const value = useMemo(
    () => ({
      currentWeather,
      forecast,
      airQuality,

      // NEW
      uvIndex,

      units,
      isLoading,
      error,
      recentSearches,
      favorites,

      searchCity,
      fetchWeatherByCoords,
      toggleUnits,
      toggleFavorite,
    }),
    [
      currentWeather,
      forecast,
      airQuality,
      uvIndex,
      units,
      isLoading,
      error,
      recentSearches,
      favorites,
      searchCity,
      fetchWeatherByCoords,
      toggleUnits,
      toggleFavorite,
    ]
  )

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  )
}