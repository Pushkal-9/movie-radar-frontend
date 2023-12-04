import React, { useState } from 'react';
import './EditCustomer.css'; 

const EditCustomer = () => {
  const [userName, setUsername] = useState('');
  const [customerData, setCustomerData] = useState({
    name: '',
    userName: '',
    password: '',
    email: '',
  });
  const [message, setMessage] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    if (userName === 'ishan_sarode') {
      setCustomerData({
        name: 'Ishan Sarode',
        userName: 'ishan_sarode',
        password: 'password',
        email: 'ishansarode@gmail.com',
      });
      setMessage('');
    } else {
      setCustomerData({
        name: '',
        userName: '',
        password: '',
        email: '',
      });
      setMessage('Customer not found.');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    setMessage('Customer details edited successfully!');
  };

  return (
    <div>
    <div className="emp-container">
      <div className="emp-search-form">
        <h2 className="emp-heading">Edit Customer</h2>
        <form className="emp-form" onSubmit={handleSearch}>
          <div>
            <label className="emp-label">Customer Username:</label>
            <input className="emp-input"
              type="text"
              value={userName}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <div>
            <button className="emp-button" type="submit">Search Customer</button>
          </div>
        </form>
        {message && <p className="emp-msg">{message}</p>}
      </div>
      {customerData.name && (
        <div className="emp-edit-form">
          <form className="emp-form" onSubmit={handleEdit}>
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
                name="userName"
                value={customerData.userName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="emp-label">Password:</label>
              <input className="emp-input"
                type="text"
                name="password"
                value={customerData.password}
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
              <button className="emp-button" type="submit">Edit Customer</button>
            </div>
          </form>
        </div>
      )}
    </div>
    </div>
  );
};

export default EditCustomer;
