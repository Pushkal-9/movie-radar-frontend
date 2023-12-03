import React from 'react';
import { Link } from 'react-router-dom';
import './NavAdm.css';

const NavAdm = ({ isLoggedIn, logout }) => {
  return (
    <nav>
      <ul>
        
        <li>
          <Link to="/admin/add-employee">Add Employee</Link>
        </li>
        <li>
          <Link to="/admin/delete-employee">Delete Employee</Link>
        </li>
        <li>
          <Link to="/admin/edit-employee">Edit Employee</Link>
        </li>
        {isLoggedIn ? (
          <li className="logout-button">
            <Link onClick={logout}>Logout</Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

export default NavAdm;
