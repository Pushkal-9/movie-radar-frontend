import React, { useState } from 'react';
import axios from 'axios';
import { config } from '../common/Constants';
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react'
import { Navigate } from 'react-router-dom'



function PasswordResetRequest() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);


    const instance = axios.create({
    baseURL: config.url.API_BASE_URL
  })


    const handleInputChange = (e, { name, value }) => {
        if (name === 'email') {
          setEmail(value)
        }
      }

      const handleRequest = async () => {
        try {
            const response = await instance.post(`/users/passwordResetRequest?email=${email}`);
            setMessage(response.data.message);
            if(response.data.success === false){
              setMessage(response.data.message);
              setIsError(true)
            }
            else{
            setIsSuccess(true)
            setEmail('')
            setIsError(false)
            }
        } catch (error) {
            setMessage('Error requesting reset.')
            setIsError(true)
        }
    };

  

    return (
        <Grid textAlign='center'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size='large' onSubmit={handleRequest}>
              <Segment>
                <Form.Input
                  fluid
                  autoFocus
                  name='email'
                  icon='user'
                  iconPosition='left'
                  placeholder='Email'
                  onChange={handleInputChange}
                />
                <Button color='purple' fluid size='large' style={{ backgroundColor: '#2e466e' }} >Request Reset Link</Button>
              </Segment>
            </Form>
            {isError && <Message negative>The Email provided is invalid</Message>}
            {isSuccess &&<Navigate to={"/resetConfirmation"} />}

    
          </Grid.Column>
        </Grid>
      );
}

export default PasswordResetRequest;