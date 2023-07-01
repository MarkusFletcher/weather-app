import React, { ChangeEvent, useState } from 'react'
import { IWeatherLocationData } from '../../../types/weather.types'
import s from './SearchLocation.module.scss'
import { WeatherService } from '../../../services/weather.service'

interface Props {
  setLocation: React.Dispatch<React.SetStateAction<string>>
  close: () => void
}

export const SearchLocation: React.FC<Props> = ({ setLocation, close }) => {
  const [locations, setLocations] = useState<IWeatherLocationData[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')

  const search = () => {
    if (!searchQuery) return
    WeatherService.searchLocation(searchQuery).then(data => {
      setLocations(data)
      console.log(locations)
    })
  }

  const searchFormSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    search()
  }

  const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    if (e.target.value === '') {
      setSearchQuery('')
      setLocations([])
    }
    // if (searchQuery.length > 3) search()
  }

  const clickResultHandler = (e: any) => {
    console.log(e.target.dataset.url)
    setLocation(e.target.dataset.url)
    close()
  }

  return (
    <div className={s.searchLocation}>
      <form className={s.form} onSubmit={searchFormSubmitHandler}>
        <input
          className={s.search}
          type='search'
          name='location'
          id='location'
          value={searchQuery}
          onChange={searchInputHandler}
        />
        <button className='button' type='submit'>
          Search
        </button>
      </form>

      <div className={s.results}>
        {locations.map(location => (
          <div
            className={s.result}
            key={location.id}
            onClick={clickResultHandler}
            data-url={location.url}
          >
            {location.name} {location.country}
          </div>
        ))}
      </div>
    </div>
  )
}
