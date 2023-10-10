import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import './index.css'

// Import pages
import App from './App.tsx'
import About from './pages/about/About.tsx'
import LogIn from './pages/login/LogIn.tsx'
import SignIn from './pages/signin/SignIn.tsx'
import Home from './pages/home/Home.tsx'
import Profile from './pages/profile/Profile.tsx'
import AddState from './pages/add/AddState.tsx'

import { store } from './app/store.ts'
import { getUserFromStorage } from './features/user/userSlice.ts'
import PrivateProfile from './pages/profile/PrivateProfile.tsx'

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
        element: <PrivateProfile />,
        children: [
          {
            path: '',
            element: <Profile />
          }
        ]
      },
      {
        path: '/add',
        element: <AddState />
      },
    ]
  },
])

store.dispatch(getUserFromStorage());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
