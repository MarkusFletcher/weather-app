import axios from 'axios'

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY
const WEATHER_API_URL = process.env.REACT_APP_WEATHER_API_URL

export const weatherApi = axios.create({
  baseURL: WEATHER_API_URL,
  params: {
    key: WEATHER_API_KEY,
    lang: 'ru',
  },
})
