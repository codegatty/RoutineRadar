import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import RoutineContextProvider from './context/RoutineProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RoutineContextProvider>
      <App />
    </RoutineContextProvider>
  </React.StrictMode>,
)
