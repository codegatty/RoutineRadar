import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import RoutineContextProvider from './context/RoutineProvider.jsx'
import {ErrorBoundary} from 'react-error-boundary'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Routine from './pages/Routine.jsx'
import Layout from './pages/Layout.jsx'


const router=createBrowserRouter([
  {path:'/',element:<Layout/>},
  {path:'/routine',element:<Routine/>}
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RoutineContextProvider>
      <ErrorBoundary fallback={<div>something happened...</div>}>
        
        <RouterProvider router={router} />
      </ErrorBoundary>
      
    </RoutineContextProvider>
  </React.StrictMode>,
)
