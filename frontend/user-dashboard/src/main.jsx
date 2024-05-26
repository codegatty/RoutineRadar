import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import RoutineContextProvider from './context/RoutineProvider.jsx'
import {ErrorBoundary} from 'react-error-boundary'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

import UserContextProvider from './context/userContext.jsx'

import Routine from './pages/Routine.jsx'
import App from './App.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Layout from './pages/Layout.jsx'

const router=createBrowserRouter([
  {path:'/',element:<App/>,children:[
    {path:'/',element:<Layout/>},
    {path:'/routine',element:<Routine/>},
    {path:'/profile',element:<ProfilePage/>},
    {path:'/register',element:<RegisterPage/>},
    {path:'/login',element:<LoginPage/>},
  ]},

])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

      <UserContextProvider>
    <RoutineContextProvider>
      <ErrorBoundary fallback={<div>something happened...</div>}>
        
        <RouterProvider router={router} />
      </ErrorBoundary>
      
    </RoutineContextProvider>
    </UserContextProvider>

  </React.StrictMode>,
)
