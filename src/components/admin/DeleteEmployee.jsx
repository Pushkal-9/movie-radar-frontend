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
    <div className="container">
      <div className="form-container">
        <h2>Delete Employee</h2>
        <form onSubmit={handleDelete}>
          <div>
            <label>Employee ID:</label>
            <input
              type="text"
              value={employeeId}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <button type="submit">Delete Employee</button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
    </div>
  );
};

export default DeleteEmployee;
