import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import {ErrorBoundary} from 'react-error-boundary'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

import UserContextProvider from './context/userContext.jsx'
import RoutineContextProvider from './context/RoutineProvider.jsx'
import  RoadmapContextProvider  from './context/RoadmapProvider.jsx'

import Routine from './pages/Routine.jsx'
import App from './App.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Layout from './pages/Layout.jsx'
import Roadmap from './pages/Roadmap.jsx'
import Challenge from './pages/Challenge.jsx'
import ArchivedRoutine from './pages/ArchivedRoutine.jsx'

const router=createBrowserRouter([
  {path:'/',element:<App/>,children:[
    {path:'/',element:<Layout/>},
    {path:'/routine',element:<Routine/>},
    {path:'/profile',element:<ProfilePage/>},
    {path:'/roadmap',element:<Roadmap/>},
    {path:'/challenge',element:<Challenge/>},
    {path:'/archived_routine',element:<ArchivedRoutine/>}
  ]},
  {path:'/register',element:<RegisterPage/>},
  {path:'/login',element:<LoginPage/>},

])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

      <UserContextProvider>
    <RoutineContextProvider>
      <RoadmapContextProvider>
      <ErrorBoundary fallback={<div>something happened...</div>}>
        
        <RouterProvider router={router} />
      </ErrorBoundary>
      </RoadmapContextProvider>
    </RoutineContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
