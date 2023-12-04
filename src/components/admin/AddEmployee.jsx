import React, { useState } from 'react';
import './AddEmployee.css'; 

const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    position: '',
    email: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted data:', employeeData);
  };

  return (
    <div>
    <div className="admin-container">
      <div className="admin-form-container">
        <h2 className="admin-heading">Add Employee</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div>
            <label className="admin-label">First Name:</label>
            <input className="admin-input"
              type="text"
              name="firstName"
              value={employeeData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="admin-label">Last Name:</label>
            <input className="admin-input"
              type="text"
              name="lastName"
              value={employeeData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="admin-label">Position:</label>
            <input className="admin-input"
              type="text"
              name="position"
              value={employeeData.position}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="admin-label">Email:</label>
            <input className="admin-input"
              type="email"
              name="email"
              value={employeeData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <button className="admin-button" type="submit">Add Employee</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddEmployee;
