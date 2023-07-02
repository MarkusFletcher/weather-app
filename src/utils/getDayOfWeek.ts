interface IDaysOfWeek {
  [key: string]: string[]
}

export const getDayOfWeek = (date: string, lang: string = 'ru'): string => {
  const days: IDaysOfWeek = {
    ru: [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ],
    en: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
  }
  const dateObject: Date = new Date(date)

  return days[lang]?.[dateObject.getDay()]
}
