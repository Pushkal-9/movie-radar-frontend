import React from 'react';
import { Link } from 'react-router-dom';
import './NavEmp.css';

const NavEmp = ({ isEmpLoggedIn, logoutEmp }) => {
  return (
    <nav className="emp-nav">
      <ul className="emp-nav-list">
        
        <li className="emp-nav-list-item">
          <Link className="emp-link" to="/emp/add-customer">Add Customer</Link>
        </li>
        <li className="emp-nav-list-item">
          <Link className="emp-link" to="/emp/delete-customer">Delete Customer</Link>
        </li>
        <li className="emp-nav-list-item">
          <Link className="emp-link" to="/emp/edit-customer">Edit Customer</Link>
        </li>
        {isEmpLoggedIn ? (
          <li className="logout-button">
            <Link className="emp-link" onClick={logoutEmp}>Logout</Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

export default NavEmp;
