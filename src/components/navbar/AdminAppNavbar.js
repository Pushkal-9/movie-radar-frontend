import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Container, Menu, Dropdown } from 'semantic-ui-react'
import { useAuth } from '../auth/AuthContext'
import styles from './navbar.module.css'
import myImage from '../../assets/logo-color.png'
import {config} from "../common/Constants";


function AdminAppNavbar() {
    const { userIsAuthenticated, userLogout } = useAuth()
    const navigate = useNavigate();


    const logout = () => {
        userLogout()
        window.location.href = config.url.HOSTED_BASE_URL
    }

    const enterMenuStyle = () => {
        return userIsAuthenticated() ? { "display": "none" } : { "display": "block" }
    }

    const logoutMenuStyle = () => {
        return userIsAuthenticated() ? { "display": "block" } : { "display": "none" }
    }

    const addMovie = (showId) => {
        navigate(`/admin/add-movie`);
    };

    const addTheatre = (showId) => {
        navigate(`/admin/add-theatre`);
    };

    const addScreen = (showId) => {
        navigate(`/admin/add-screen`);
    };

    const addShow = (showId) => {
        navigate(`/admin/add-show`);
    };


    return (
        <Menu inverted color='purple' stackable size='large' style={{ borderRadius: 0, backgroundColor: '#2e466e' }}>
            <Container>
                <Menu.Item header>
                    <div>
                        <img className="logo" src={myImage} style={{ marginRight: '10px' }} alt="Logo" />
                    </div>
                    Movie Radar
                </Menu.Item>

                <Menu.Menu position='right'>
                    <Dropdown item text='Add' style={logoutMenuStyle()}>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={addScreen}>Add Screen</Dropdown.Item>
                            <Dropdown.Item onClick={addShow}>Add Show</Dropdown.Item>
                            <Dropdown.Item onClick={addTheatre}>Add Theatre</Dropdown.Item>
                            <Dropdown.Item onClick={addMovie}>Add Movie</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>

                <Menu.Menu position='right'>
                    <Menu.Item as={Link} to="/login" style={enterMenuStyle()}>Login</Menu.Item>
                    <Menu.Item as={Link} to="/" style={logoutMenuStyle()} onClick={logout}>Logout</Menu.Item>
                </Menu.Menu>
            </Container>
        </Menu>
    )
}

export default AdminAppNavbar
