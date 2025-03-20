import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import View from './pages/View'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'

const Router = () => {
    return (
        <Routes>
            <Route index path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route element={<ProtectedRoute />}>

                <Route path='/home' element={<Home />} />
                <Route path='/view/:id' element={<View />} />
            </Route>
            <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default Router