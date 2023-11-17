import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { config } from '../common/Constants';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate
import { Button} from 'semantic-ui-react'




  function PasswordResetForm() {
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false)
    const [formLoaded, setFormLoaded] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);


    const instance = axios.create({
        baseURL: config.url.API_BASE_URL
      })

    const location = useLocation()

  useEffect(() => {
    const resetToken = extractUrlParameter('token')
    if (resetToken) {
        setToken(resetToken)
        handleReset();
    }
  }, [])

  const extractUrlParameter = (key) => {
    return new URLSearchParams(location.search).get(key)
  }

  const handleReset = () => {
    try {
        const resetToken = extractUrlParameter('token');
        console.log('Reset Token:', resetToken); // Add this line for debugging
        if (resetToken) {
            setToken(resetToken);
            instance.get(`/users/resetPassword?token=${resetToken}`)
                .then((response) => {
                    if (response.data.success === true) {
                        setFormLoaded(true);
                    } else {
                        setMessage('Invalid reset link/token');
                    }
                })
                .catch((error) => {
                    setMessage('Invalid reset link/token');
                });
        } else {
            setMessage('Token not found in URL');
        }
    } catch (error) {
        setMessage('Error resetting password.');
    }
};


const handleRequest = async () => {
    try {
        if(password !== confirmPassword){
            setMessage("Passwords don't Match")
            return
        }
        const resetToken = extractUrlParameter('token');
        const response = await instance.post(`/users/doReset`,{ token,password });
        setMessage(response.data.message);
        setToken('')
        setIsSuccess(true)
        setPassword('')
        setIsError(false)
    } catch (error) {
        setMessage('Error requesting reset.')
        setIsError(true)
    }
};

    return (
        <div>
            {formLoaded ? (
                <div>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button color='purple' fluid size='large' style={{ backgroundColor: '#2e466e'}} onClick={handleRequest}>Reset Password</Button>
                    <div>{message}</div>
                </div>
            ) : (
                <div>{message}</div>
            )}
        </div>
    );
}

export default PasswordResetForm;



