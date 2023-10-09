import axios from 'axios'

export const weatherApi = axios.create({
  baseURL: process.env.REACT_APP_WEATHER_API_URL,
  params: {
    key: process.env.REACT_APP_WEATHER_API_KEY,
    lang: 'ru',
  },
})
