interface Params {
  separator: string
}

const defaultParams: Params = {
  separator: ':',
}

export const convertTimeFormat = (
  time: string,
  params: Params = defaultParams,
): string => {
  const date: Date = new Date(`2000-01-01 ${time}`)
  const hours: number = date.getHours()
  const minutes: number = date.getMinutes()

  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`

  return `${formattedHours}${params.separator}${formattedMinutes}`
}
