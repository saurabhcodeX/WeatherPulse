// src/api/uvService.js

const UV_API_URL = 'https://api.open-meteo.com/v1/forecast'

export const getUVIndex = async (lat, lon) => {
  if (
    lat === undefined ||
    lon === undefined ||
    lat === null ||
    lon === null
  ) {
    throw new Error('Location coordinates are required for UV data.')
  }

  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: 'uv_index',
    timezone: 'auto',
  })

  const response = await fetch(
    `${UV_API_URL}?${params.toString()}`
  )

  if (!response.ok) {
    throw new Error('Unable to load UV information.')
  }

  const data = await response.json()

  return data?.current?.uv_index ?? null
}