import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import { ErrorBoundary } from 'react-error-boundary'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import UserContextProvider from './context/userContext.jsx'
import RoutineContextProvider from './context/RoutineProvider.jsx'
import RoadmapContextProvider from './context/RoadmapProvider.jsx'
import AnalyticsContextProvider from './context/AnalyticsContext.jsx'
import AuthProvider from './context/AuthContext.jsx'

import Routine from './pages/Routine.jsx'
import App from './App.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Layout from './pages/Layout.jsx'
import Roadmap from './pages/Roadmap.jsx'
import Challenge from './pages/Challenge.jsx'
import ArchivedRoutine from './pages/ArchivedRoutine.jsx'
import ProtectedRoute from './pages/ProtectedRoute.jsx'
import Logout from './pages/Logout.jsx'
import Setting from './pages/Setting.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><App /></ProtectedRoute>,
    children: [
      { path: '/', element: <Layout /> },
      { path: '/routine', element: <Routine /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/roadmap', element: <Roadmap /> },
      { path: '/challenge', element: <Challenge /> },
      { path: '/archived_routine', element: <ArchivedRoutine /> },
      {path:'/setting',element:<Setting/>}
    ]
  },
  { path: '/register', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/logout', element: <Logout /> }
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <UserContextProvider>
        <RoutineContextProvider>
          <RoadmapContextProvider>
            <AnalyticsContextProvider>
              <ErrorBoundary fallback={<div>something happened...</div>}>
                <RouterProvider router={router} />
              </ErrorBoundary>
            </AnalyticsContextProvider>
          </RoadmapContextProvider>
        </RoutineContextProvider>
      </UserContextProvider>
    </AuthProvider>
  </React.StrictMode>
)
