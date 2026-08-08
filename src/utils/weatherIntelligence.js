// src/utils/weatherIntelligence.js

/**
 * WeatherPulse Weather Intelligence
 *
 * Converts raw weather data into simple,
 * useful recommendations for the user.
 */

// --------------------------------------------------
// Rain analysis
// --------------------------------------------------

export const getRainRisk = (forecast = []) => {
  if (!forecast.length) {
    return {
      level: 'Unknown',
      percentage: 0,
      message: 'Rain information is currently unavailable.',
    }
  }

  const probabilities = forecast
    .slice(0, 8)
    .map((item) => {
      return Math.round((item.pop || 0) * 100)
    })

  const highestProbability = Math.max(...probabilities)

  if (highestProbability >= 70) {
    return {
      level: 'High',
      percentage: highestProbability,
      message: 'Rain is likely. Consider carrying an umbrella.',
    }
  }

  if (highestProbability >= 40) {
    return {
      level: 'Moderate',
      percentage: highestProbability,
      message: 'There is a moderate chance of rain.',
    }
  }

  return {
    level: 'Low',
    percentage: highestProbability,
    message: 'Low chance of rain during the next several hours.',
  }
}

// --------------------------------------------------
// Outdoor activity analysis
// --------------------------------------------------

export const getOutdoorRecommendation = (
  weather,
  rainRisk
) => {
  if (!weather) {
    return {
      status: 'Unavailable',
      message: 'Weather data is unavailable.',
    }
  }

  const temperature = weather.main?.temp ?? 0
  const windSpeed = weather.wind?.speed ?? 0
  const weatherId = weather.weather?.[0]?.id ?? 800

  const isRain =
    weatherId >= 200 && weatherId < 600

  const isExtremeHeat = temperature >= 38
  const isVeryCold = temperature <= 5
  const isStrongWind = windSpeed >= 12

  if (isExtremeHeat) {
    return {
      status: 'Poor',
      message:
        'High temperature detected. Avoid prolonged outdoor activity.',
    }
  }

  if (isVeryCold) {
    return {
      status: 'Caution',
      message:
        'Cold conditions detected. Dress appropriately for outdoor activity.',
    }
  }

  if (isRain || rainRisk.percentage >= 60) {
    return {
      status: 'Caution',
      message:
        'Rain is possible. Outdoor activities may be interrupted.',
    }
  }

  if (isStrongWind) {
    return {
      status: 'Caution',
      message:
        'Strong winds are expected. Outdoor activities may be uncomfortable.',
    }
  }

  return {
    status: 'Good',
    message:
      'Weather conditions are favorable for outdoor activities.',
  }
}

// --------------------------------------------------
// Travel condition analysis
// --------------------------------------------------

export const getTravelRecommendation = (
  weather,
  visibility
) => {
  if (!weather) {
    return {
      status: 'Unavailable',
      message: 'Travel information is unavailable.',
    }
  }

  const windSpeed = weather.wind?.speed ?? 0
  const weatherId = weather.weather?.[0]?.id ?? 800

  const isSevereWeather =
    weatherId >= 200 && weatherId < 700

  const visibilityKm =
    visibility !== undefined
      ? visibility / 1000
      : 10

  if (isSevereWeather) {
    return {
      status: 'Poor',
      message:
        'Severe weather may affect travel conditions.',
    }
  }

  if (visibilityKm < 2) {
    return {
      status: 'Poor',
      message:
        'Low visibility detected. Use extra caution while traveling.',
    }
  }

  if (windSpeed >= 15) {
    return {
      status: 'Caution',
      message:
        'Strong winds may affect travel conditions.',
    }
  }

  return {
    status: 'Favorable',
    message:
      'Current conditions are generally favorable for travel.',
  }
}

// --------------------------------------------------
// UV analysis
// --------------------------------------------------

export const getUVRecommendation = (uvIndex) => {
  if (uvIndex === null || uvIndex === undefined) {
    return {
      level: 'Unavailable',
      message: 'UV information is unavailable.',
    }
  }

  if (uvIndex >= 8) {
    return {
      level: 'Very High',
      message:
        'Strong UV exposure. Use sunscreen and limit direct sun exposure.',
    }
  }

  if (uvIndex >= 6) {
    return {
      level: 'High',
      message:
        'Sun protection is recommended during prolonged outdoor activity.',
    }
  }

  if (uvIndex >= 3) {
    return {
      level: 'Moderate',
      message:
        'Consider sun protection during extended outdoor activity.',
    }
  }

  return {
    level: 'Low',
    message:
      'Low UV exposure under current conditions.',
  }
}

// --------------------------------------------------
// Air quality analysis
// --------------------------------------------------

export const getAirQualityRecommendation = (aqi) => {
  if (!aqi) {
    return {
      level: 'Unavailable',
      message: 'Air quality information is unavailable.',
    }
  }

  const levels = {
    1: {
      level: 'Good',
      message:
        'Air quality is good. Outdoor activity is generally safe.',
    },

    2: {
      level: 'Fair',
      message:
        'Air quality is acceptable for most people.',
    },

    3: {
      level: 'Moderate',
      message:
        'Sensitive individuals may want to reduce prolonged outdoor activity.',
    },

    4: {
      level: 'Poor',
      message:
        'Consider limiting strenuous or prolonged outdoor activity.',
    },

    5: {
      level: 'Very Poor',
      message:
        'Avoid prolonged outdoor exposure where possible.',
    },
  }

  return (
    levels[aqi] || {
      level: 'Unknown',
      message:
        'Air quality information is currently unavailable.',
    }
  )
}

// --------------------------------------------------
// Main intelligence function
// --------------------------------------------------

export const generateWeatherIntelligence = ({
  currentWeather,
  forecast = [],
  airQuality = null,
  uvIndex = null,
}) => {
  if (!currentWeather) {
    return null
  }

  const rainRisk = getRainRisk(forecast)

  const outdoor = getOutdoorRecommendation(
    currentWeather,
    rainRisk
  )

  const travel = getTravelRecommendation(
    currentWeather,
    currentWeather.visibility
  )

  const uv = getUVRecommendation(uvIndex)

  const air = getAirQualityRecommendation(
    airQuality?.main?.aqi
  )

  return {
    rain: rainRisk,
    outdoor,
    travel,
    uv,
    air,
  }
}