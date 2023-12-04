import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginAdmin.css'; 

const LoginAdmin = ({ authenticate }) => {
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
      authenticate(); 
      navigate('/admin/add-employee'); 
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div>
      <div className="admin-login-container">
        <div className="admin-login-form-container">
          <h2 className="admin-heading">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label className="admin-label">Email:</label>
              <input className="admin-input"
                type="email"
                name="email"
                value={email}
                onChange={(event) => handleInputChange(event)}
                required
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Password:</label>
              <input className="admin-input"
                type="password"
                name="password"
                value={password}
                onChange={(event) => handleInputChange(event)}
                required
              />
            </div>
            <div className="admin-form-group">
              <button className="admin-button" type="submit">Sign In</button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
