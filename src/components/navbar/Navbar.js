import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'
import { useAuth } from '../auth/AuthContext'
import styles from './navbar.module.css'
import myImage from '../../assets/logo-color.png'


function Navbar() {
  const { getUser, userIsAuthenticated, userLogout } = useAuth()

  const logout = () => {
    userLogout()
  }

  const enterMenuStyle = () => {
    return userIsAuthenticated() ? { "display": "none" } : { "display": "block" }
  }

  const logoutMenuStyle = () => {
    return userIsAuthenticated() ? { "display": "block" } : { "display": "none" }
  }


  const getUserName = () => {
    const user = getUser()
    return user ? user.data.name : ''
  }

  return (
    <Menu inverted color='purple' stackable size='large' style={{ borderRadius: 0, backgroundColor: '#2e466e' }}>
      <Container>
        <Menu.Item header> <div>
            <img className="logo" src={myImage} />
          </div>  Movie Radar </Menu.Item>
        <Menu.Item as={Link} exact='true' to="/">Home</Menu.Item>
        <Menu.Menu position='right' >
          <Menu.Item as={Link} to="/login" style={enterMenuStyle()}>Login</Menu.Item>
          <Menu.Item as={Link} to="/signup" style={enterMenuStyle()}>Sign Up</Menu.Item>
          <Menu.Item header style={logoutMenuStyle()}>{`Hi ${getUserName()}`}</Menu.Item>
          <Menu.Item as={Link} to="/" style={logoutMenuStyle()} onClick={logout}>Logout</Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  )
}

export default Navbar
