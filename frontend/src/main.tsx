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
import AddList from './pages/listing/AddList.tsx'
import ViewList from './pages/listing/ViewList.tsx'
import PrivateRoute from './components/PrivateRoute.tsx'
import SingleListing from './pages/home/SingleListing.tsx'
import EditList from './pages/listing/EditList.tsx'

import { store } from './app/store.ts'
import { getUserFromStorage } from './features/user/userSlice.ts'

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
        path: 'listing/:id',
        element: <SingleListing />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'login',
        element: <LogIn />
      },
      {
        path: 'signin',
        element: <SignIn />
      },
      {
        path: 'profile',
        element: <PrivateRoute />,
        children: [
          {
            path: '',
            element: <Profile />
          }
        ]
      },
      {
        path: 'add',
        element: <PrivateRoute />,
        children: [
          {
            path: '',
            element: <AddList />
          }
        ]
      },
      {
        path: 'view',
        element: <PrivateRoute />,
        children: [
          {
            path: '',
            element: <ViewList />
          }
        ]
      },
      {
        path: 'edit-listing',
        element: <PrivateRoute />,
        children: [
          {
            path: ':id',
            element: <EditList />
          }
        ]
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
