import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import RoutineContextProvider from './context/RoutineProvider.jsx'
import {ErrorBoundary} from 'react-error-boundary'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import {Auth0Provider} from '@auth0/auth0-react'
import UserContextProvider from './context/userContext.jsx'

import Routine from './pages/Routine.jsx'
import App from './App.jsx'
import ProfilePage from './pages/ProfilePage.jsx'



const router=createBrowserRouter([
  {path:'/',element:<App/>},
  {path:'/routine',element:<Routine/>},
  {path:'/profile',element:<ProfilePage/>}
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider domain='dev-4jfiy6jgo6zsib84.us.auth0.com' clientId='CJtyKHH32pwoUerYxzcVfRq9EsNUny3y' authorizationParams={{
      redirect_uri:window.location.origin,
      audience:"https://RoutineRadorUserAuth/",
      scope:"openid profile email"
    }}>
      <UserContextProvider>
    <RoutineContextProvider>
      <ErrorBoundary fallback={<div>something happened...</div>}>
        
        <RouterProvider router={router} />
      </ErrorBoundary>
      
    </RoutineContextProvider>
    </UserContextProvider>
    </Auth0Provider>
  </React.StrictMode>,
)
