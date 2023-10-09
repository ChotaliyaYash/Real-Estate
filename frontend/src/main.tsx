import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Import pages
import App from './App.tsx'
import About from './pages/about/About.tsx'
import LogIn from './pages/login/LogIn.tsx'
import SignIn from './pages/signin/SignIn.tsx'
import Home from './pages/home/Home.tsx'
import Profile from './pages/profile/Profile.tsx'
import AddState from './pages/add/AddState.tsx'

// Router creation
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/login',
        element: <LogIn />
      },
      {
        path: '/signin',
        element: <SignIn />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/add',
        element: <AddState />
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
