import React, { useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
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

import NavAdm from './components/admin/NavAdm';
import LoginAdmin from './components/admin/LoginAdmin';
import AddEmployee from './components/admin/AddEmployee';
import EditEmployee from './components/admin/EditEmployee';
import DeleteEmployee from './components/admin/DeleteEmployee';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const authenticate = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  const PrivateRoute = ({ element, ...props }) => {
    return isLoggedIn ? element : <Navigate to="/admin" />;
  };

  return (
    <div>
      {window.location.pathname.includes("/admin") || (
        <AuthProvider>
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
            </Routes>
          </div>
        </Router>
        </AuthProvider>
      )}
      {window.location.pathname.includes("/admin") && (
        <Router>
          <div className="App">
            <NavAdm isLoggedIn={isLoggedIn} logout={logout} />
            <Routes>
              <Route
                path="/admin"
                element={<LoginAdmin authenticate={authenticate} />}
              />
              <Route
                path="/admin/delete-employee"
                element={<PrivateRoute element={<DeleteEmployee />} />}
              />
              <Route
                path="/admin/add-employee"
                element={<PrivateRoute element={<AddEmployee />} />}
              />
              <Route
                path="/admin/edit-employee"
                element={<PrivateRoute element={<EditEmployee />} />}
              />
            </Routes>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
