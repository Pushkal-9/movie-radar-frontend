import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginEmp.css'; 

const LoginEmp = ({ authenticateEmp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email === 'user@example.com' && password === 'password') {
      setError('');
      authenticateEmp(); 
      navigate('/emp/add-customer'); 
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div>
      <div className="emp-login-container">
        <div className="emp-login-form-container">
          <h2 className="emp-heading">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="emp-form-group">
              <label className="emp-label">Email:</label>
              <input className="emp-input"
                type="email"
                name="email"
                value={email}
                onChange={(event) => handleInputChange(event)}
                required
              />
            </div>
            <div className="emp-form-group">
              <label className="emp-label">Password:</label>
              <input className="emp-input"
                type="password"
                name="password"
                value={password}
                onChange={(event) => handleInputChange(event)}
                required
              />
            </div>
            <div className="emp-form-group">
              <button className="emp-button" type="submit">Sign In</button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginEmp;
