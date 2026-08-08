import axios from 'axios'

const BASE_URL = 'https://api.openweathermap.org/data/2.5'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

// Safe diagnostic — never prints the complete API key
console.log('WeatherPulse API:', {
  configured: Boolean(API_KEY),
  keyLength: API_KEY?.length || 0,
})

const request = async (path, params = {}) => {
  if (!API_KEY) {
    throw new Error(
      'WeatherPulse API key is missing. Check your .env file.'
    )
  }

  try {
    const response = await axios.get(
      `${BASE_URL}${path}`,
      {
        params: {
          ...params,
          appid: API_KEY.trim(),
        },
        timeout: 10000,
      }
    )

    return response.data
  } catch (error) {
    const status = error.response?.status
    const message = error.response?.data?.message

    console.error('WeatherPulse API Error:', {
      endpoint: path,
      status,
      message,
    })

    if (status === 401) {
      throw new Error(
        'OpenWeather rejected the API key. Check that the key is active and correctly configured.'
      )
    }

    if (status === 404) {
      throw new Error(
        'Location not found. Please check the city name.'
      )
    }

    if (status === 429) {
      throw new Error(
        'OpenWeather request limit reached. Please try again later.'
      )
    }

    throw new Error(
      message || 'Unable to retrieve weather data.'
    )
  }
}

const markDaylight = (data) => {
  if (
    !data?.sys?.sunrise ||
    !data?.sys?.sunset
  ) {
    return data
  }

  const now = Math.floor(Date.now() / 1000)

  return {
    ...data,
    sys: {
      ...data.sys,
      day:
        now >= data.sys.sunrise &&
        now < data.sys.sunset,
    },
  }
}

export const getCurrentWeatherByCity = (
  city,
  units = 'metric'
) => {
  return request('/weather', {
    q: city,
    units,
  }).then(markDaylight)
}

export const getCurrentWeatherByCoords = (
  lat,
  lon,
  units = 'metric'
) => {
  return request('/weather', {
    lat,
    lon,
    units,
  }).then(markDaylight)
}

export const getForecastByCity = (
  city,
  units = 'metric'
) => {
  return request('/forecast', {
    q: city,
    units,
  })
}

export const getForecastByCoords = (
  lat,
  lon,
  units = 'metric'
) => {
  return request('/forecast', {
    lat,
    lon,
    units,
  })
}

export const getAirQuality = (
  lat,
  lon
) => {
  return request('/air_pollution', {
    lat,
    lon,
  })
}

export const getWeatherBundleByCity = async (
  city,
  units = 'metric'
) => {
  const current =
    await getCurrentWeatherByCity(
      city,
      units
    )

  const [forecast, air] =
    await Promise.all([
      getForecastByCoords(
        current.coord.lat,
        current.coord.lon,
        units
      ),

      getAirQuality(
        current.coord.lat,
        current.coord.lon
      ),
    ])

  return {
    current,
    forecast,
    air: air?.list?.[0] || null,
  }
}

export const getWeatherBundleByCoords = async (
  lat,
  lon,
  units = 'metric'
) => {
  const current =
    await getCurrentWeatherByCoords(
      lat,
      lon,
      units
    )

  const [forecast, air] =
    await Promise.all([
      getForecastByCoords(
        lat,
        lon,
        units
      ),

      getAirQuality(
        lat,
        lon
      ),
    ])

  return {
    current,
    forecast,
    air: air?.list?.[0] || null,
  }
}