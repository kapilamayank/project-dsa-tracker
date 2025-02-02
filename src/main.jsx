import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import CategoryList from './components/CategoryList.jsx'
import ProblemList from './components/ProblemList.jsx'
import RevisionList from './components/RevisionList.jsx'
import LoginSignupForm from './components/LoginSignupForm.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import AuthLayout from './components/AuthLayout.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={ ( <AuthLayout><ProblemList /></AuthLayout>)} />
      <Route path='categories' element={( <AuthLayout><CategoryList /></AuthLayout> )} />
      <Route path='revision' element={ (<AuthLayout><RevisionList /></AuthLayout> )} />
      <Route path='auth' element={<LoginSignupForm />}>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup/>} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
)
