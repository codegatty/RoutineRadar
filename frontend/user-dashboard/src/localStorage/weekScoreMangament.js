import { weekStarterEnderFinder } from '../utility/weekStarterAndEnder'
export function getScoreData() {
  return parseFloat(localStorage.getItem('weekScoreData'))
}

export function setScoreData(score) {
  
  if(score){
    const dates = weekStarterEnderFinder()
    const firstDay = dates[0]
    const lastDay = dates[1]
    const currentDate = new Date()
    if (currentDate.getDate() >= firstDay.getDate() && currentDate.getDate() <= lastDay.getDate()) {
        const newScoreData=getScoreData()+score
      localStorage.removeItem('weekScoreData')
      localStorage.setItem('weekScoreData', JSON.stringify(newScoreData))
    } else {
      localStorage.removeItem('weekScoreData')
      localStorage.setItem('weekScoreData', JSON.stringify(0))
    }
  }
}

export function refreshScoreData() {
  const data = 0
  localStorage.removeItem('weekScoreData')
  localStorage.setItem('weekScoreData', parseFloat(data))
}
