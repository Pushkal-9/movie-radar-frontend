import React from 'react';
import { Link } from 'react-router-dom';
import './NavAdm.css';

const NavAdm = ({ isAdminLoggedIn, logout }) => {
  return (
    <nav className="nav-admin">
      <ul className="nav-admin-list">
        
        <li className="nav-admin-list-item">
          <Link className="link" to="/admin/add-employee">Add Employee</Link>
        </li>
        <li className="nav-admin-list-item">
          <Link className="link" to="/admin/delete-employee">Delete Employee</Link>
        </li>
        <li className="nav-admin-list-item">
          <Link className="link" to="/admin/edit-employee">Edit Employee</Link>
        </li>
        {isAdminLoggedIn ? (
          <li className="logout-button">
            <Link className="link" onClick={logout}>Logout</Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

export default NavAdm;
