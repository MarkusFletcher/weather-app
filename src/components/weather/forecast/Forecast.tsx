import {
  IForecastHour,
  IWeatherForecastData,
} from '../../../types/weather.types'
import { ForecastHours } from './Forecast.hours'
import { ForecastDays } from './Forecast.days'
import s from './Forecast.module.scss'

interface Props {
  forecast: IWeatherForecastData
}

export const Forecast: React.FC<Props> = ({ forecast }) => {
  return (
    <div className={s.forecast}>
      <ForecastHours hours={forecast.forecastday.shift()?.hour}></ForecastHours>
      <ForecastDays days={[...forecast.forecastday]}></ForecastDays>
    </div>
  )
}
