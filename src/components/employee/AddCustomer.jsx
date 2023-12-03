import React, { useState } from 'react';
import './AddCustomer.css'; 

const AddEmployee = () => {
  const [customerData, setCustomerData] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted data:', customerData);
    setMessage('Customer Added Successfully!')
  };

  return (
    <div>
    <div className="container">
      <div className="form-container">
        <h2>Add Customer</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={customerData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={customerData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={customerData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={customerData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <button type="submit">Add Customer</button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
    </div>
  );
};

export default AddEmployee;
