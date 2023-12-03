import React from 'react';
import { Link } from 'react-router-dom';
import './NavEmp.css';

const NavEmp = ({ isEmpLoggedIn, logoutEmp }) => {
  return (
    <nav>
      <ul>
        
        <li>
          <Link to="/emp/add-customer">Add Customer</Link>
        </li>
        <li>
          <Link to="/emp/delete-customer">Delete Customer</Link>
        </li>
        <li>
          <Link to="/emp/edit-customer">Edit Customer</Link>
        </li>
        {isEmpLoggedIn ? (
          <li className="logout-button">
            <Link onClick={logoutEmp}>Logout</Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

export default NavEmp;
