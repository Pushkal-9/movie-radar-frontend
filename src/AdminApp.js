import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import AddMovie from "./components/admin/AddMovie";
import AddTheatre from "./components/admin/AddTheatre";
import AddScreen from "./components/admin/AddScreen";
import AddShow from "./components/admin/AddShow";
import {useAuth} from "./components/auth/AuthContext";
import AdminAppNavbar from "./components/navbar/AdminAppNavbar";
import Login from "./components/auth/Login";
import ChatSupport from "./components/chat/ChatSupport";
import AddEmployee from "./components/admin/AddEmployee";
import EditEmployee from "./components/admin/EditEmployee";
import DeleteEmployee from "./components/admin/DeleteEmployee";



function AdminApp() {

    const Auth = useAuth();
    const isAdminLoggedIn = Auth.userIsAdmin();

    const PrivateRouteAdmin = ({ element, ...props }) => {
        return isAdminLoggedIn ? element : <Navigate to="/admin" />;
    };

    return (
        <div>
            {window.location.pathname.startsWith("/admin") && (
                <Router>
                    <div>
                        <AdminAppNavbar />
                        <Routes>
                            <Route path="/admin" element={<Login />} />
                            <Route
                                path="/admin/chat-support"
                                element={<PrivateRouteAdmin element={<ChatSupport />} />}
                            />
                            <Route
                                path="/admin/add-movie"
                                element={<PrivateRouteAdmin element={<AddMovie />} />}
                            />
                            <Route
                                path="/admin/add-theatre"
                                element={<PrivateRouteAdmin element={<AddTheatre />} />}
                            />
                            <Route
                                path="/admin/add-show"
                                element={<PrivateRouteAdmin element={<AddShow />} />}
                            />
                            <Route
                                path="/admin/add-screen"
                                element={<PrivateRouteAdmin element={<AddScreen />} />}
                            />
                            <Route
                                path="/admin/add-employee"
                                element={<PrivateRouteAdmin element={<AddEmployee />} />}
                            />
                            <Route
                                path="/admin/add-employee"
                                element={<PrivateRouteAdmin element={<EditEmployee />} />}
                            />
                            <Route
                                path="/admin/delete-employee"
                                element={<PrivateRouteAdmin element={<DeleteEmployee />} />}
                            />
                        </Routes>
                    </div>
                </Router>
            )}
        </div>
    );
}

export default AdminApp;
