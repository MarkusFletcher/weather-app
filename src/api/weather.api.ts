import axios from 'axios'

export const weatherApi = axios.create({
  baseURL: process.env.REACT_APP_WEATHER_API_KEY,
  params: {
    key: process.env.REACT_APP_WEATHER_API_URL,
    lang: 'ru',
  },
})
