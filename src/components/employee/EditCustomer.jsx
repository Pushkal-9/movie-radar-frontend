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
    <div className="container">
      <div className="search-form">
        <h2>Edit Customer</h2>
        <form onSubmit={handleSearch}>
          <div>
            <label>Customer Username:</label>
            <input
              type="text"
              value={userName}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit">Search Customer</button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
      {customerData.name && (
        <div className="edit-form">
          <form onSubmit={handleEdit}>
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
                name="userName"
                value={customerData.userName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="text"
                name="password"
                value={customerData.password}
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
              <button type="submit">Edit Customer</button>
            </div>
          </form>
        </div>
      )}
    </div>
    </div>
  );
};

export default EditCustomer;
