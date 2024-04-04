import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

import App from './App.jsx'
import './index.css'

import NotFound from './pages/NotFound.jsx'
import Dashboard from './pages/Dashboard.jsx'

import Analytics from './pages/Analytics.jsx'
import Users from './pages/Users.jsx'
import Challanges from './pages/Challanges.jsx'
import Login from './pages/Login.jsx'

const router=createBrowserRouter([
  {path:'/',element:<App/>,errorElement:<NotFound/>},
  {path:'/dashboard',element:<Dashboard/>,children:[
    {path:'/dashboard/analytics',element:<Analytics/>},
    {path:'/dashboard/users',element:<Users/>},
    {path:'/dashboard/challenges',element:<Challanges/>}
  ]},
  {path:'/login',element:<Login/>}
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
