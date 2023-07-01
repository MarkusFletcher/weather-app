import { IWeatherCurrentData } from '../../../types/weather.types'
import s from './Current.module.scss'

interface Props {
  weather: IWeatherCurrentData
  openSearch: () => void
}

export const Current: React.FC<Props> = ({ weather, openSearch }) => {
  const time = weather.current.last_updated.split(' ')[1]
  const dayOrNightImgUrl = `status/${
    weather.current.is_day ? 'sun' : 'moon'
  }.svg`

  return (
    <div className={s.current}>
      <div className={s.imageStatus}>
        <img src={dayOrNightImgUrl} alt=''></img>
      </div>
      <div className={s.info}>
        <div className={s.time}>{time}</div>
        <div className={s.temperature}>{weather.current.temp_c}°C</div>
        <div className={s.location} onClick={openSearch}>
          {`${weather.location.name}, ${weather.location.country}`}
        </div>
      </div>
    </div>
  )
}
