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
      <div className="login-container">
        <div className="login-form-container">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(event) => handleInputChange(event)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(event) => handleInputChange(event)}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit">Sign In</button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
