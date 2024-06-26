import { weekStarterEnderFinder } from '../utility/weekStarterAndEnder'
export function getScoreData() {
 let val= parseFloat(localStorage.getItem('weekScoreData'))
 if(val)
    return val;
  else{
    refreshScoreData();
    return parseFloat(localStorage.getItem('weekScoreData'))
  }
}

export function setScoreData(score) {
  
  
  if(score){
    const dates = weekStarterEnderFinder()
    const firstDay = dates[0]
    const lastDay = dates[1]
    const currentDate = new Date()
    if (currentDate>= firstDay && currentDate && lastDay) {
        const newScoreData=getScoreData()+score
        console.log(getScoreData())
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
