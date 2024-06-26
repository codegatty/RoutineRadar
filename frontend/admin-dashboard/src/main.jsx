import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

import App from './App.jsx'
import './index.css'

//context
import AuthContextProvider from './context/AuthProvider.jsx'
import AdminsContextProvider from './context/AdminsProvider.jsx'
import ChallengeContextProvider from './context/ChallengeProvider.jsx'
import BadgeContextProvider from './context/BadgeProvider.jsx'

import NotFound from './pages/NotFound.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProtectedRoute from './pages/ProtectedRoute.jsx'
import PersistLogin from './pages/PersistLogin.jsx'

import Analytics from './pages/dashboardPages/Analytics.jsx'
import Users from './pages/dashboardPages/Users.jsx'
import Challenges from './pages/dashboardPages/Challenges.jsx'
import Challenge from './pages/dashboardPages/Challenge.jsx'
import Admins from './pages/dashboardPages/Admins.jsx'
import Admin from './pages/dashboardPages/Admin.jsx'
import Login from './pages/Login.jsx'
import Badge from './pages/dashboardPages/Badge.jsx'
import Badges from './pages/dashboardPages/Badges.jsx'


const router=createBrowserRouter([
  {path:'/',element:<App/>,errorElement:<NotFound/>},
  
  // {path:'/dashboard',element:<ProtectedRoute><Dashboard/></ProtectedRoute>,children:[
  //   {path:'/dashboard/analytics',element:<Analytics/>},
  //   {path:'/dashboard/users',element:<Users/>},
  //   {path:'/dashboard/challenges',element:<Challenges/>},
  //   {path:'/dashboard/challenges/challenge',element:<Challenge/>},
  //   {path:'/dashboard/admins',element:<Admins/>},
  //   {path:'/dashboard/admins/admin',element:<Admin/>}
  // ]},

  {element:<PersistLogin/>,children:[
    {path:'/dashboard',element:<ProtectedRoute><Dashboard/></ProtectedRoute>,children:[
      {path:'/dashboard/analytics',element:<Analytics/>},
      {path:'/dashboard/users',element:<Users/>},
      {path:'/dashboard/challenges',element:<Challenges/>},
      {path:'/dashboard/challenges/challenge',element:<Challenge/>},
      {path:'/dashboard/admins',element:<Admins/>},
      {path:'/dashboard/admins/admin',element:<Admin/>},
      {path:'/dashboard/badge/',element:<Badge/>},
      {path:'/dashboard/badges/',element:<Badges/>},
    ]}

  ]},
  {path:'/login',element:<Login/>}
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <AdminsContextProvider>
      <ChallengeContextProvider>
        <BadgeContextProvider>
    <RouterProvider router={router} />
    </BadgeContextProvider>
    </ChallengeContextProvider>
    </AdminsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
