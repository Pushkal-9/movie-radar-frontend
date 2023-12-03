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
    <div className="container">
      <div className="form-container">
        <h2>Delete Customer</h2>
        <form onSubmit={handleDelete}>
          <div>
            <label>Customer Username:</label>
            <input
              type="text"
              value={customerUsername}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <button type="submit">Delete Customer</button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
    </div>
  );
};

export default DeleteCustomer;
