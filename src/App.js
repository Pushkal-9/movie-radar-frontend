import React from 'react'
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import {AuthProvider} from './components/auth/AuthContext'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Login from './components/auth/Login'
import OAuth2Redirect from './components/auth/OAuth2Redirect'
import Signup from './components/auth/Signup'
import PasswordResetRequest from './components/auth/PasswordResetRequest'
import PasswordResetForm from './components/auth/PasswordResetForm'
import PasswordResetConfirmation from './components/auth/PasswordResetConfirmation'
import MovieSeatLayout from './components/seats/MovieSeatLayout'
import SelectShow from './components/showDetails/SeletShow'
import CheckoutCallback from "./components/booking/CheckoutCallback";
import BookingDetails from "./components/booking/BookingDetails";


function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/signup' element={<Signup/>}/>
                    <Route path='/oauth2/redirect' element={<OAuth2Redirect/>}/>
                    <Route path='/passwordResetRequest' element={<PasswordResetRequest/>}/>
                    <Route path='/resetPassword' element={<PasswordResetForm/>}/>
                    <Route path='/resetConfirmation' element={<PasswordResetConfirmation/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                    <Route path='/movie-seat-layout/:showId' element={<MovieSeatLayout/>}/>
                    <Route path="/selectshow/:cityId/:movieId" element={<SelectShow/>}/>
                    <Route path="/show/:showId/booking/:bookingId/status/:statusCode" element={<CheckoutCallback/>}/>
                    <Route path="/booking/:bookingId/details" element={<BookingDetails/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
