import { weekStarterEnderFinder } from '../utility/weekStarterAndEnder'
export function getWeekData() {
  return JSON.parse(localStorage.getItem('weekTaskData'))
}

export function setWeekData(noOfTasks) {

    let data = JSON.parse(localStorage.getItem('weekTaskData'))

    const dates = weekStarterEnderFinder()
    const firstDay = dates[0]
    const lastDay = dates[1]
    const currentDate = new Date()
    if (currentDate.getDate() >= firstDay.getDate() && currentDate.getDate() <= lastDay.getDate()) {
      let datesOfWeek = []

      //get all dates from start date
      for (let i = 0; i <= 6; i++) {
        const newDate = new Date(firstDay)
        newDate.setDate(firstDay.getDate() + i) // Increment the date by i days
        datesOfWeek.push(newDate)
      }

      for (let i = 0; i <= 6; i++) {
        const date = new Date(datesOfWeek[i])
        if (date.getDate() == currentDate.getDate()) {
          data[i] = noOfTasks
          break
        }
      }
      localStorage.removeItem('weekTaskData')
      localStorage.setItem('weekTaskData', JSON.stringify(data))
    } else {
      const data = [0, 0, 0, 0, 0, 0, 0]
      localStorage.removeItem('weekTaskData')
      localStorage.setItem('weekTaskData', JSON.stringify(data))
    }
  }

export function refreshWeekData() {
  const data = [0, 0, 0, 0, 0, 0, 0]
  localStorage.removeItem('weekTaskData')
  localStorage.setItem('weekTaskData', JSON.stringify(data))
}
