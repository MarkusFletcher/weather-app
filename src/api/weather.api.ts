import axios from 'axios'

export const weatherApi = axios.create({
  baseURL: 'http://api.weatherapi.com/v1',
  params: {
    key: '33f4d472f10e4b3eb15151411232106',
    lang: 'ru',
  },
})
