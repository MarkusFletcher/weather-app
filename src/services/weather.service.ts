import { AxiosResponse } from 'axios'
import { weatherApi } from '../api'
import {
  IWeatherCurrentData,
  IWeatherForecastData,
  IWeatherForecastResponsData,
  IWeatherLocationData,
} from '../types/weather.types'

export class WeatherService {
  static async currentWeather(location: string): Promise<IWeatherCurrentData> {
    const res: AxiosResponse<IWeatherCurrentData> = await weatherApi.get(
      'current.json',
      {
        params: {
          q: location,
        },
      },
    )
    return res.data
  }
  static async forecastWeather(
    location: string,
  ): Promise<IWeatherForecastData> {
    const res: AxiosResponse<IWeatherForecastResponsData> =
      await weatherApi.get('forecast.json', {
        params: {
          q: location,
          days: 7,
        },
      })
    return res.data.forecast
  }
  static async searchLocation(req: string): Promise<IWeatherLocationData[]> {
    const res: AxiosResponse<IWeatherLocationData[]> = await weatherApi.get(
      'search.json',
      {
        params: {
          q: req,
        },
      },
    )
    return res.data
  }
}
