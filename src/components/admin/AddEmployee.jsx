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
    <div className="container">
      <div className="form-container">
        <h2>Add Employee</h2>
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Add Employee</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddEmployee;
