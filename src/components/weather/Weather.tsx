import { useEffect, useMemo, useState } from 'react'
import { WeatherService } from '../../services/weather.service'
import { Current } from './current'
import { SearchLocation } from './search-location'
import { Modal } from '../modal'
import s from './Weather.module.scss'
import { IWeatherCurrentData } from '../../types/weather.types'

export const Weather = () => {
  const [weather, setWeather] = useState<IWeatherCurrentData>(
    {} as IWeatherCurrentData,
  )
  const [location, setLocation] = useState<string>('Moscow')
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
    WeatherService.currentWeather(location).then(data => {
      setWeather(data)
      setIsLoading(false)
      console.log(data)
      setSkyColor(data.current.is_day ? '#81A1DB' : '#41516E')
    })
  }

  const getUserLocation = (): void => {
    navigator.geolocation.getCurrentPosition(position => {
      const location = `${position.coords.latitude},${position.coords.longitude}`
      setLocation(location)
      setCurrentWeather()

      console.log(location)
    })
  }

  useEffect(() => {
    setCurrentWeather()

    return () => {}
  }, [location])

  // useMemo(() => getUserLocation, [])()

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
