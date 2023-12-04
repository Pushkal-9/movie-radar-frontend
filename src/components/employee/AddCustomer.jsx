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
    <div className="emp-container">
      <div className="emp-form-container">
        <h2 className="emp-heading">Add Customer</h2>
        <form className="emp-form" onSubmit={handleSubmit}>
          <div>
            <label className="emp-label">Name:</label>
            <input className="emp-input"
              type="text"
              name="name"
              value={customerData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="emp-label">Username:</label>
            <input className="emp-input"
              type="text"
              name="username"
              value={customerData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="emp-label">Email:</label>
            <input className="emp-input"
              type="email"
              name="email"
              value={customerData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="emp-label">Password:</label>
            <input className="emp-input"
              type="password"
              name="password"
              value={customerData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <button className="emp-button" type="submit">Add Customer</button>
          </div>
        </form>
        {message && <p className="emp-msg">{message}</p>}
      </div>
    </div>
    </div>
  );
};

export default AddEmployee;
