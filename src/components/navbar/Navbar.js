import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Container, Dropdown, Menu} from 'semantic-ui-react'
import { useAuth } from '../auth/AuthContext'
import styles from './navbar.module.css'
import myImage from '../../assets/logo-color.png'
import {config} from "../common/Constants";

function Navbar() {
  const { getUser, userIsAuthenticated, userLogout , userIsAdmin} = useAuth()
  const navigate = useNavigate();


  const logout = () => {
    userLogout()
  }

  const enterMenuStyle = () => {
    return userIsAuthenticated() ? { "display": "none" } : { "display": "block" }
  }

  const logoutMenuStyle = () => {
    return userIsAuthenticated() ? { "display": "block" } : { "display": "none" }
  }

  const adminMenuStyle = () => {
    return userIsAdmin() ? { "display": "block" } : { "display": "none" }
  }

  const userProfile = () => {
    navigate(`/user-profile`);
  };

  const adminTab = () => {
    window.location.href = config.url.HOSTED_BASE_URL+'/admin/add-movie'
  };


  const getUserName = () => {
    const user = getUser()
    return user ? user.data.name : ''
  }

  return (
    <Menu inverted color='purple' stackable size='large' style={{ borderRadius: 0, backgroundColor: '#2e466e' }}>
      <Container>
        <Menu.Item header> <div>
            <img className="logo" src={myImage} style={{ marginRight: '10px' }}/>

          </div>  Movie Radar </Menu.Item>
        <Menu.Item as={Link} exact='true' to="/">Home</Menu.Item>
        <Menu.Menu position='right' >
          <Menu.Item as={Link} to="/login" style={enterMenuStyle()}>Login</Menu.Item>
          <Menu.Item as={Link} to="/signup" style={enterMenuStyle()}>Sign Up</Menu.Item>
          <Dropdown item text={getUserName()} style={logoutMenuStyle()} position='right'>
            <Dropdown.Menu>
              <Dropdown.Item header style={logoutMenuStyle()} onClick={userProfile}>User Profile</Dropdown.Item>
              <Dropdown.Item header style={adminMenuStyle()} onClick={adminTab}>Admin</Dropdown.Item>
              <Dropdown.Item as={Link} to="/" style={logoutMenuStyle()} onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Container>
    </Menu>
  )
}

export default Navbar
