import React, {useEffect, useState} from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { Button, Form, Grid, Icon, Segment, Menu, Message, Divider } from 'semantic-ui-react'
import { useAuth } from './AuthContext'
import { movieApi } from './MovieApi'
import {parseJwt, getSocialLoginUrl, handleLogError } from './Helpers'

function Login() {
  const Auth = useAuth()
  const isLoggedIn = Auth.userIsAuthenticated()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)

  const handleInputChange = (e, { name, value }) => {
    if (name === 'username') {
      setUsername(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!(username && password)) {
      setIsError(true)
      return
    }

    try {
      const response = await movieApi.authenticate(username, password)
      const { accessToken } = response.data
      const data = parseJwt(accessToken)
      const authenticatedUser = { data, accessToken }

      Auth.userLogin(authenticatedUser)

      const userDetailsResponse = await movieApi.fetchUserDetails(data.email)

      Auth.storeUserDetails(userDetailsResponse.data)

      setUsername('')
      setPassword('')
      setIsError(false)
    } catch (error) {
      handleLogError(error)
      setIsError(true)
    }
  }

  const [isAdminLoggedIn, setAdminLoggedIn] = useState(false);

  useEffect(() => {
    if(isLoggedIn) {
      let userDetails = JSON.parse(localStorage.getItem('userDetails'))
      if (userDetails?.userType === 'ADMIN') {
        setAdminLoggedIn(true)
      }
    }
  }, []);

if (isLoggedIn){
    return <Navigate to='/' />
  }

  return (
    <Grid textAlign='center'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment>
            <Form.Input
              fluid
              autoFocus
              name='username'
              icon='user'
              iconPosition='left'
              placeholder='Username'
              onChange={handleInputChange}
            />
            <Form.Input
              fluid
              name='password'
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              onChange={handleInputChange}
            />
            <Button color='purple' fluid size='large' style={{ backgroundColor: '#2e466e' }} >Login</Button>
          </Segment>
        </Form>
        <Message>{`Forgot Password `}
          <NavLink to="/passwordResetRequest" color='purple'>Reset Password</NavLink>
        </Message>
        <Message>{`Don't have already an account? `}
          <NavLink to="/signup" color='purple'>Sign Up</NavLink>
        </Message>
        {isError && <Message negative>The username or password provided are incorrect!</Message>}

        <Divider horizontal>or connect with</Divider>

        <Menu compact icon='labeled'>
          <Menu.Item name='github' href={getSocialLoginUrl('github')}>
            <Icon name='github' />Github
          </Menu.Item>
          <Menu.Item name='google' href={getSocialLoginUrl('google')}>
            <Icon name='google' />Google
          </Menu.Item>
          <Menu.Item name='facebook'>
            <Icon name='facebook' disabled />Facebook
          </Menu.Item>
        </Menu>
      </Grid.Column>
    </Grid>
  )
}

export default Login