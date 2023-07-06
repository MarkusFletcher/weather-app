import { IForecastDay } from '../../../types/weather.types'
import s from './Forecast.module.scss'
import { getDayOfWeek } from '../../../utils/getDayOfWeek'
import { convertTimeFormat } from '../../../utils/convertTimeFormat'
import { BsSunriseFill, BsSunsetFill } from 'react-icons/bs'
import { useState } from 'react'
import { ForecastHours } from './Forecast.hours'
import clsx from 'clsx'

interface Props {
  day: IForecastDay
}

export const ForecastDay: React.FC<Props> = ({ day }) => {
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false)

  const toggleDetail = () => {
    setIsOpenDetail(state => (state = !state))
  }

  return (
    <div className={s.dayItem} key={day.date_epoch}>
      <div className={s.head} onClick={toggleDetail}>
        <div className={s.dayOfWeek}>{getDayOfWeek(day.date)}</div>
        <div className={s.daylightHours}>
          <div className={s.item}>
            <BsSunriseFill color='#FFB70A' size={20}></BsSunriseFill>
            <span>{convertTimeFormat(day.astro.sunrise)}</span>
          </div>
          <div className={s.item}>
            <BsSunsetFill color='#FFB70A' size={20}></BsSunsetFill>
            <span>{convertTimeFormat(day.astro.sunset)}</span>
          </div>
        </div>
        <div className={s.temp}>
          <img className={s.icon} src={day.day.condition.icon} alt='' />
          <span>{day.day.mintemp_c}°</span>
          <span>...</span>
          <span>{day.day.maxtemp_c}°</span>
        </div>
      </div>

      <div className={clsx(s.detail, { [s.open]: isOpenDetail })}>
        <div>
          <ForecastHours hours={day.hour}></ForecastHours>
        </div>
      </div>
    </div>
  )
}
