import React, { useState } from 'react';
import './EditEmployee.css'; 

const EditEmployee = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    position: '',
    email: '',
  });
  const [message, setMessage] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    if (employeeId === '123') {
      setEmployeeData({
        firstName: 'John',
        lastName: 'Doe',
        position: 'Software Engineer',
        email: 'john.doe@example.com',
      });
      setMessage('');
    } else {
      setEmployeeData({
        firstName: '',
        lastName: '',
        position: '',
        email: '',
      });
      setMessage('Employee not found.');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    setMessage('Employee details edited successfully!');
  };

  return (
    <div>
    <div className="container">
      <div className="search-form">
        <h2>Edit Employee</h2>
        <form onSubmit={handleSearch}>
          <div>
            <label>Employee ID:</label>
            <input
              type="text"
              value={employeeId}
              onChange={(event) => setEmployeeId(event.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit">Search Employee</button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
      {employeeData.firstName && (
        <div className="edit-form">
          <form onSubmit={handleEdit}>
            <div>
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={employeeData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={employeeData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Position:</label>
              <input
                type="text"
                name="position"
                value={employeeData.position}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={employeeData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <button type="submit">Edit Employee</button>
            </div>
          </form>
        </div>
      )}
    </div>
    </div>
  );
};

export default EditEmployee;
