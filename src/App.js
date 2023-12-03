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

import NavAdm from './components/admin/NavAdm';
import LoginAdmin from './components/admin/LoginAdmin';
import AddEmployee from './components/admin/AddEmployee';
import EditEmployee from './components/admin/EditEmployee';
import DeleteEmployee from './components/admin/DeleteEmployee';

import NavEmp from './components/employee/NavEmp';
import LoginEmp from './components/employee/LoginEmp';
import AddCustomer from './components/employee/AddCustomer';
import EditCustomer from './components/employee/EditCustomer';
import DeleteCustomer from './components/employee/DeleteCustomer';



function App() {
  const [isAdminLoggedIn, setAdminLoggedIn] = useState(false);
  const [isEmpLoggedIn, setEmpLoggedIn] = useState(false);

  const authenticate = () => {
    setAdminLoggedIn(true);
  };

  const logout = () => {
    setAdminLoggedIn(false);
  };

  const PrivateRouteAdmin = ({ element, ...props }) => {
    return isAdminLoggedIn ? element : <Navigate to="/admin" />;
  };

  const authenticateEmp = () => {
    setEmpLoggedIn(true);
  };

  const logoutEmp = () => {
    setEmpLoggedIn(false);
  };

  const PrivateRouteEmp = ({ element, ...props }) => {
    return isEmpLoggedIn ? element : <Navigate to="/emp" />;
  };

  return (
    <div>
      {!(window.location.pathname.includes("/admin") || window.location.pathname.includes("/emp")) && (
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
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
      )}
      {window.location.pathname.includes("/admin") && (
        <Router>
          <div className="App">
            <NavAdm isAdminLoggedIn={isAdminLoggedIn} logout={logout} />
            <Routes>
              <Route
                path="/admin"
                element={<LoginAdmin authenticate={authenticate} />}
              />
              <Route
                path="/admin/delete-employee"
                element={<PrivateRouteAdmin element={<DeleteEmployee />} />}
              />
              <Route
                path="/admin/add-employee"
                element={<PrivateRouteAdmin element={<AddEmployee />} />}
              />
              <Route
                path="/admin/edit-employee"
                element={<PrivateRouteAdmin element={<EditEmployee />} />}
              />
            </Routes>
          </div>
        </Router>
      )}
      {window.location.pathname.includes("/emp") && (
        <Router>
          <div className="App">
            <NavEmp isEmpLoggedIn={isEmpLoggedIn} logoutEmp={logoutEmp} />
            <Routes>
              <Route
                path="/emp"
                element={<LoginEmp authenticateEmp={authenticateEmp} />}
              />
              <Route
                path="/emp/delete-customer"
                element={<PrivateRouteEmp element={<DeleteCustomer />} />}
              />
              <Route
                path="/emp/add-customer"
                element={<PrivateRouteEmp element={<AddCustomer />} />}
              />
              <Route
                path="/emp/edit-customer"
                element={<PrivateRouteEmp element={<EditCustomer />} />}
              />
            </Routes>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
