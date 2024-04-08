import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

import App from './App.jsx'
import './index.css'

import NotFound from './pages/NotFound.jsx'
import Dashboard from './pages/Dashboard.jsx'

import Analytics from './pages/dashboardPages/Analytics.jsx'
import Users from './pages/dashboardPages/Users.jsx'
import Challenges from './pages/dashboardPages/Challenges.jsx'
import Challenge from './pages/dashboardPages/Challenge.jsx'
import Admins from './pages/dashboardPages/Admins.jsx'
import Admin from './pages/dashboardPages/Admin.jsx'

const router=createBrowserRouter([
  {path:'/',element:<App/>,errorElement:<NotFound/>},
  {path:'/dashboard',element:<Dashboard/>,children:[
    {path:'/dashboard/analytics',element:<Analytics/>},
    {path:'/dashboard/users',element:<Users/>},
    {path:'/dashboard/challenges',element:<Challenges/>},
    {path:'/dashboard/challenges/challenge',element:<Challenge/>},
    {path:'/dashboard/admins',element:<Admins/>},
    {path:'/dashboard/admins/admin',element:<Admin/>}
  ]},
  {path:'/login',element:<div>login</div>}
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
