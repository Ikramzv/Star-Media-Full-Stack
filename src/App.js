import React from 'react'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import HomeLayout from './Layout/HomeLayout'
import Register from './pages/Register/Register'

function App() {
  return (
    <div style={{overflowX: 'clip'}} >
      <Routes>
        <Route path='/' element={<Navigate replace={'/'} to={'/login'} />} />
        <Route path='/' element={<HomeLayout />} >
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  )
}

export default App