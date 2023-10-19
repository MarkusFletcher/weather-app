import { useEffect, useMemo, useState } from 'react'
import { WeatherService } from '../../services/weather.service'
import { Current } from './current'
import { SearchLocation } from './search-location'
import { Modal } from '../modal'
import { Forecast } from './forecast'
import s from './Weather.module.scss'
import {
  IWeatherCurrentData,
  IWeatherForecastData,
} from '../../types/weather.types'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const INITIAL_LOCATION = 'Moscow'
enum SkyColors {
  DAY = '129, 161, 219',
  NIGHT = '65, 81, 110',
}
const HeadBg = {
  DAY: `linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(${SkyColors.DAY}, 0.76) 15%, rgba(${SkyColors.DAY}, 1) 30%)`,
  NIGHT: `linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(${SkyColors.NIGHT}, 0.76) 15%, rgba(${SkyColors.NIGHT}, 1) 30%)`,
}

export const Weather = () => {
  const [weather, setWeather] = useState<IWeatherCurrentData>(
    {} as IWeatherCurrentData,
  )
  const [forecast, setForecast] = useState<IWeatherForecastData>(
    {} as IWeatherForecastData,
  )
  const [location, setLocation] = useLocalStorage<string>(
    'location',
    INITIAL_LOCATION,
  )
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [isLoadingCurrent, setIsLoadingCurrent] = useState<boolean>(true)
  const [isLoadingForecast, setIsLoadingForecast] = useState<boolean>(true)
  const [skyColor, setSkyColor] = useState<string>('#81A1DB')

  const closeSearch = () => {
    setIsSearchOpen(false)
  }

  const openSearch = () => {
    setIsSearchOpen(true)
  }

  const setCurrentWeather = () => {
    if (location.length > 0) {
      WeatherService.currentWeather(location)
        .then(data => {
          setWeather(data)
          setIsLoadingCurrent(false)
          setSkyColor(data.current.is_day ? '#81A1DB' : '#41516E')
        })
        .catch(err => {
          console.error(err)
        })
      WeatherService.forecastWeather(location).then(data => {
        setForecast(data)
        setIsLoadingForecast(false)
      })
    }
  }

  const getUserLocation = (): void => {
    navigator.geolocation.getCurrentPosition(position => {
      if (location === INITIAL_LOCATION) {
        const location = `${position.coords.latitude},${position.coords.longitude}`
        setLocation(location)
      }
    })
  }

  useEffect(() => {
    getUserLocation()
    setCurrentWeather()

    return () => {}
  }, [location])

  return !isLoadingCurrent ? (
    <div className={s.weather} style={{ backgroundColor: skyColor }}>
      <header
        className={s.head}
        style={{
          background: weather.current.is_day ? HeadBg.DAY : HeadBg.NIGHT,
        }}
      >
        <Current weather={weather} openSearch={openSearch}></Current>
      </header>
      <div className={s.city}>
        <img className={s.cityImg} src='city.png' alt='city'></img>
      </div>
      {!isLoadingForecast ? (
        <Forecast forecast={forecast}></Forecast>
      ) : (
        <>Loading...</>
      )}
      <Modal isOpen={isSearchOpen} close={closeSearch}>
        <SearchLocation
          setLocation={setLocation}
          close={closeSearch}
        ></SearchLocation>
      </Modal>
    </div>
  ) : (
    <>Loading...</>
  )
}
