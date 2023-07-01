import { useEffect, useMemo, useState } from 'react'
import { WeatherService } from '../../services/weather.service'
import { Current } from './current'
import { SearchLocation } from './search-location'
import { Modal } from '../modal'
import s from './Weather.module.scss'
import { IWeatherCurrentData } from '../../types/weather.types'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const INITIAL_LOCATION = 'Moscow'

export const Weather = () => {
  const [weather, setWeather] = useState<IWeatherCurrentData>(
    {} as IWeatherCurrentData,
  )
  const [location, setLocation] = useLocalStorage<string>(
    'location',
    INITIAL_LOCATION,
  )
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [skyColor, setSkyColor] = useState<string>('')

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
          setIsLoading(false)
          setSkyColor(data.current.is_day ? '#81A1DB' : '#41516E')
        })
        .catch(err => {
          console.error(err)
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

  return !isLoading ? (
    <div className={s.weather} style={{ backgroundColor: skyColor }}>
      <div className={s.head}>
        <Current weather={weather} openSearch={openSearch}></Current>
        <div className={s.city}>
          <img className={s.cityImg} src='city.png' alt='city'></img>
        </div>
      </div>
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
