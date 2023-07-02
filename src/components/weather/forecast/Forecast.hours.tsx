import { IForecastHour } from '../../../types/weather.types'
import s from './Forecast.module.scss'

interface Props {
  hours: IForecastHour[] | undefined
}

export const ForecastHours: React.FC<Props> = ({ hours }) => {
  return (
    <div className={s.forecastHours}>
      {hours ? (
        hours.map(hour => (
          <div className={s.item} key={hour.time_epoch}>
            <span className={s.time}>{hour.time.split(' ')[1]}</span>
            <img className={s.icon} src={hour.condition.icon} alt='' />
            <span>{hour.temp_c}°</span>
          </div>
        ))
      ) : (
        <span>Нет данных о погоде</span>
      )}
    </div>
  )
}
