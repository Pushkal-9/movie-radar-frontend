import React, { useEffect, useState } from "react";
import { useAuth } from '../auth/AuthContext';
import axios from "axios";
import { config } from "../common/Constants";
import { Button, Form, Segment, Loader } from 'semantic-ui-react';
import './UserProfile.css';

function UserProfile() {
    const { getUser } = useAuth();
    const [dataIsLoaded, setDataIsLoaded] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [editMode, setEditMode] = useState(false);

    const instance = axios.create({
        baseURL: config.url.API_BASE_URL
    });

    const getUserEmail = () => {
        const user = getUser();
        console.log("User Email :", user.data.email);
        return user ? user.data.email : '';
    }

    useEffect(() => {
        instance.get('/api/users/email/'+ getUserEmail() +'/details')
            .then((res) => {
                setUserDetails(res.data);
                setDataIsLoaded(true);
            })
            .catch(err => {
                throw new Error(err);
            });
    }, []);

    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    const handleInputChange = (e, { name, value }) => {
        setUserDetails({...userDetails, [name]: value});
    };

    if (!dataIsLoaded) return <Loader active inline='centered' />;

    return (
        <div className="user-profile-container">
            <Segment className="user-profile-segment user-profile-main-content">
                <div>
                    <h1>User Profile</h1>
                    {editMode ? (
                        <Form>
                            <Form.Input
                                fluid
                                label="Full Name"
                                name="name"
                                value={userDetails.name || ''}
                                onChange={handleInputChange}
                            />
                            <Form.Input
                                fluid
                                label="Favourite Genres"
                                name="favoriteGenres"
                                value={userDetails.favoriteGenres || ''}
                                onChange={handleInputChange}
                            />
                        </Form>
                    ) : (
                        <>
                            <p><strong>Username: </strong> {userDetails.username}</p>
                            <p><strong>Full Name: </strong> {userDetails.name}</p>
                            <p><strong>Favourite Genres: </strong> {userDetails.favoriteGenres}</p>
                        </>
                    )}
                    <p><strong>Email: </strong> {userDetails.email}</p>
                    <p><strong>Membership Status: </strong> {userDetails.membershipType}</p>
                        <Button className="user-profile-action-btn" onClick={handleEditClick} color={editMode ? 'green' : 'blue'}>
                            {editMode ? 'Save' : 'Edit'}
                        </Button>
                </div>
            </Segment>
        </div>
    );
}

export default UserProfile;
