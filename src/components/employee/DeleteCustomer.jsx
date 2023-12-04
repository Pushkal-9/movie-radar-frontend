import React, { useState } from 'react';
import './DeleteCustomer.css'; 

const DeleteCustomer = () => {
  const [customerUsername, setCustomerUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    setCustomerUsername(event.target.value);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    if (customerUsername === '123') {
      setMessage('Customer deleted successfully!');
    } else {
      setMessage('Customer not found.');
    }
  };

  return (
    <div>
    <div className="emp-container">
      <div className="emp-form-container">
        <h2 className="emp-heading">Delete Customer</h2>
        <form className="emp-form" onSubmit={handleDelete}>
          <div>
            <label className="emp-label">Customer Username:</label>
            <input className="emp-input"
              type="text"
              value={customerUsername}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <button className="emp-button" type="submit">Delete Customer</button>
          </div>
        </form>
        {message && <p className="emp-msg">{message}</p>}
      </div>
    </div>
    </div>
  );
};

export default DeleteCustomer;
