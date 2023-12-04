import React, { useState } from 'react';
import './DeleteEmployee.css'; 

const DeleteEmployee = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    setEmployeeId(event.target.value);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    if (employeeId === '123') {
      setMessage('Employee deleted successfully!');
    } else {
      setMessage('Employee not found.');
    }
  };

  return (
    <div>
    <div className="admin-container">
      <div className="admin-form-container">
        <h2 className="admin-heading">Delete Employee</h2>
        <form className="admin-form" onSubmit={handleDelete}>
          <div>
            <label className="admin-label">Employee ID:</label>
            <input className="admin-input"
              type="text"
              value={employeeId}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <button className="admin-button" type="submit">Delete Employee</button>
          </div>
        </form>
        {message && <p className="admin-msg">{message}</p>}
      </div>
    </div>
    </div>
  );
};

export default DeleteEmployee;
