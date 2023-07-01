import { IWeatherCurrentData } from '../../../types/weather.types'
import s from './Current.module.scss'
import { TiLocation } from 'react-icons/ti'

interface Props {
  weather: IWeatherCurrentData
  openSearch: () => void
}

export const Current: React.FC<Props> = ({ weather, openSearch }) => {
  const [date, time] = weather.current.last_updated.split(' ')
  const dayOrNightImgUrl = `status/${
    weather.current.is_day ? 'sun' : 'moon'
  }.svg`

  return (
    <div className={s.current}>
      <div className={s.imageStatus}>
        <img src={dayOrNightImgUrl} alt=''></img>
      </div>
      <div className={s.info}>
        <div className={s.field}>
          <div className={s.time}>{time}</div>
        </div>
        <div className={s.field}>
          <img src={weather.current.condition.icon} alt='' />
          <div className={s.temperature}>{weather.current.temp_c}°C</div>
        </div>
        <div className={s.field}>
          <TiLocation fontSize={20}></TiLocation>
          <div className={s.location} onClick={openSearch}>
            {`${weather.location.name}, ${weather.location.country}`}
          </div>
        </div>
        <div className={s.field}>
          <div className={s.condition}>{weather.current.condition.text}</div>
        </div>
      </div>
    </div>
  )
}
