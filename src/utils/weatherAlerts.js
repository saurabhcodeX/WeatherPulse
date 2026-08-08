// src/utils/weatherAlerts.js

const getWeatherDescription = (weather) => {
  return (
    weather?.weather?.[0]?.description ||
    ''
  ).toLowerCase()
}

const getRainProbability = (forecast = []) => {
  if (!Array.isArray(forecast) || forecast.length === 0) {
    return 0
  }

  const nextHours = forecast.slice(0, 8)

  const probabilities = nextHours
    .map((item) => Number(item?.pop || 0))
    .filter((value) => !Number.isNaN(value))

  if (probabilities.length === 0) {
    return 0
  }

  return Math.round(
    Math.max(...probabilities) * 100
  )
}

export const generateWeatherAlerts = ({
  currentWeather,
  forecast = [],
  airQuality,
  uvIndex,
}) => {
  if (!currentWeather) {
    return []
  }

  const alerts = []

  const temperature = Number(
    currentWeather?.main?.temp
  )

  const windSpeed = Number(
    currentWeather?.wind?.speed
  )

  const rainProbability =
    getRainProbability(forecast)

  const description =
    getWeatherDescription(currentWeather)

  // --------------------------------------------------
  // Heavy rain
  // --------------------------------------------------

  if (rainProbability >= 70) {
    alerts.push({
      type: 'rain',
      severity: 'high',
      title: 'Heavy Rain Expected',
      message: `Rain probability may reach ${rainProbability}% during the upcoming hours.`,
      recommendation:
        'Carry an umbrella and consider avoiding unnecessary outdoor travel.',
    })
  } else if (rainProbability >= 40) {
    alerts.push({
      type: 'rain',
      severity: 'moderate',
      title: 'Rain Possible',
      message: `There is a ${rainProbability}% chance of rain in the upcoming hours.`,
      recommendation:
        'Keep an umbrella nearby if you are heading outside.',
    })
  }

  // --------------------------------------------------
  // Extreme heat
  // --------------------------------------------------

  if (!Number.isNaN(temperature)) {
    if (temperature >= 40) {
      alerts.push({
        type: 'heat',
        severity: 'critical',
        title: 'Extreme Heat',
        message: `Current temperature is ${Math.round(temperature)}°.`,
        recommendation:
          'Avoid prolonged outdoor exposure, stay hydrated, and seek shade.',
      })
    } else if (temperature >= 35) {
      alerts.push({
        type: 'heat',
        severity: 'high',
        title: 'High Temperature',
        message: `Current temperature is ${Math.round(temperature)}°.`,
        recommendation:
          'Limit strenuous outdoor activity and stay hydrated.',
      })
    }
  }

  // --------------------------------------------------
  // Strong wind
  // --------------------------------------------------

  if (!Number.isNaN(windSpeed)) {
    if (windSpeed >= 15) {
      alerts.push({
        type: 'wind',
        severity: 'high',
        title: 'Strong Winds',
        message: `Wind speed is currently ${Math.round(windSpeed)} km/h.`,
        recommendation:
          'Use caution outdoors, especially around exposed or open areas.',
      })
    } else if (windSpeed >= 10) {
      alerts.push({
        type: 'wind',
        severity: 'moderate',
        title: 'Moderate Winds',
        message: `Wind speed is currently ${Math.round(windSpeed)} km/h.`,
        recommendation:
          'Outdoor conditions may feel noticeably windy.',
      })
    }
  }

  // --------------------------------------------------
  // High UV
  // --------------------------------------------------

  if (
    uvIndex !== null &&
    uvIndex !== undefined &&
    !Number.isNaN(Number(uvIndex))
  ) {
    const uv = Number(uvIndex)

    if (uv >= 8) {
      alerts.push({
        type: 'uv',
        severity: 'critical',
        title: 'Very High UV Exposure',
        message: `UV Index is currently ${uv}.`,
        recommendation:
          'Use sunscreen, protective clothing, and avoid prolonged direct sunlight.',
      })
    } else if (uv >= 6) {
      alerts.push({
        type: 'uv',
        severity: 'high',
        title: 'High UV Exposure',
        message: `UV Index is currently ${uv}.`,
        recommendation:
          'Use sun protection when spending time outdoors.',
      })
    }
  }

  // --------------------------------------------------
  // Air quality
  // --------------------------------------------------

  const airQualityIndex = Number(
    airQuality?.list?.[0]?.main?.aqi ??
    airQuality?.aqi
  )

  if (!Number.isNaN(airQualityIndex)) {
    if (airQualityIndex >= 4) {
      alerts.push({
        type: 'air',
        severity: 'high',
        title: 'Poor Air Quality',
        message:
          'Air quality conditions may be unhealthy for prolonged outdoor activity.',
        recommendation:
          'Consider limiting strenuous or prolonged outdoor activity.',
      })
    } else if (airQualityIndex === 3) {
      alerts.push({
        type: 'air',
        severity: 'moderate',
        title: 'Moderate Air Quality',
        message:
          'Air quality is acceptable but may affect sensitive individuals.',
        recommendation:
          'Sensitive individuals should consider limiting prolonged outdoor activity.',
      })
    }
  }

  // --------------------------------------------------
  // Thunderstorm
  // --------------------------------------------------

  if (
    description.includes('thunderstorm') ||
    description.includes('thunder')
  ) {
    alerts.push({
      type: 'storm',
      severity: 'critical',
      title: 'Thunderstorm Conditions',
      message:
        'Thunderstorm activity is currently reported.',
      recommendation:
        'Seek shelter indoors and avoid exposed outdoor areas.',
    })
  }

  // --------------------------------------------------
  // Sort critical alerts first
  // --------------------------------------------------

  const priority = {
    critical: 4,
    high: 3,
    moderate: 2,
    low: 1,
  }

  alerts.sort(
    (a, b) =>
      (priority[b.severity] || 0) -
      (priority[a.severity] || 0)
  )

  return alerts
}