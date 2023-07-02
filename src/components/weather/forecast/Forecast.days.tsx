import { IForecastDay } from '../../../types/weather.types'
import s from './Forecast.module.scss'
import { getDayOfWeek } from '../../../utils/getDayOfWeek'
import { ForecastDay } from './Forecast.day'

interface Props {
  days: IForecastDay[] | undefined
}

export const ForecastDays: React.FC<Props> = ({ days }) => {
  return (
    <div className={s.forecastDays}>
      {days ? (
        days.map(day => (
          <ForecastDay day={day} key={day.date_epoch}></ForecastDay>
        ))
      ) : (
        <span>Нет данных о погоде</span>
      )}
    </div>
  )
}
