import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import OAuth2Redirect from './components/auth/OAuth2Redirect';
import Signup from './components/auth/Signup';
import PasswordResetRequest from './components/auth/PasswordResetRequest';
import PasswordResetForm from './components/auth/PasswordResetForm';
import PasswordResetConfirmation from './components/auth/PasswordResetConfirmation';
import MovieSeatLayout from './components/seats/MovieSeatLayout';
import SelectShow from './components/showDetails/SeletShow';
import CheckoutCallback from "./components/booking/CheckoutCallback";
import BookingDetails from "./components/booking/BookingDetails";
import UserProfile from "./components/userProfile/UserProfile";
import AdminApp from "./AdminApp";
import ChatRoom from "./components/chat/ChatRoom";



function MainApp() {

    return (
        <div>
            {!(window.location.pathname.startsWith("/admin") || window.location.pathname.startsWith("/emp")) && (
                    <Router>
                        <div>
                            <Navbar />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
                                <Route path="/passwordResetRequest" element={<PasswordResetRequest />} />
                                <Route path="/resetPassword" element={<PasswordResetForm />} />
                                <Route path="/resetConfirmation" element={<PasswordResetConfirmation />} />
                                <Route path="*" element={<Navigate to="/" />} />
                                <Route path="/movie-seat-layout/:showId" element={<MovieSeatLayout />} />
                                <Route path="/selectshow/:cityId/:movieId" element={<SelectShow />} />
                                <Route path="/show/:showId/booking/:bookingId/status/:statusCode" element={<CheckoutCallback />} />
                                <Route path="/booking/:bookingId/details" element={<BookingDetails />} />
                                <Route path="/user-profile" element={<UserProfile />} />
                                <Route path="/chat" element={<ChatRoom/>} />
                            </Routes>
                        </div>
                    </Router>
            )}
            <AdminApp/>
        </div>
    );
}

export default MainApp;
