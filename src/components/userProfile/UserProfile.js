import React, { useEffect, useState } from "react";
import { useAuth } from '../auth/AuthContext';
import axios from "axios";
import { config } from "../common/Constants";
import { Button, Form, Input, Card, Spin, Typography, Upload, Row, Col, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './UserProfile.css';
import { Navigate } from "react-router-dom";

const { Title } = Typography;

function UserProfile() {
    const { userIsAuthenticated } = useAuth();
    const [dataIsLoaded, setDataIsLoaded] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const instance = axios.create({
        baseURL: config.url.API_BASE_URL
    });

    useEffect(() => {
        if (userIsAuthenticated) {
            setDataIsLoaded(true)
            setUserDetails(JSON.parse(localStorage.getItem('userDetails')))
        }
    }, [userIsAuthenticated]);

    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const handleImageChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl) => {
                setLoading(false);
                setImageUrl(imageUrl);
                console.log(imageUrl); // Log the byte array here
            });
        }
    };

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    if (!userIsAuthenticated()) {
        return <Navigate to='/' />
    }

    if (!dataIsLoaded) return <Spin size="large" style={{ display: 'block', margin: 'auto' }} />;

    return (
        <div className="user-profile-container">
            <Card className="user-profile-main-content">
                <Row gutter={24}>
                    <Col span={16}>
                        <Title level={2}>User Profile</Title>
                        {editMode ? (
                            <Form layout="vertical">
                                <Form.Item label="Full Name">
                                    <Input
                                        name="name"
                                        value={userDetails.name || ''}
                                        onChange={handleInputChange}
                                    />
                                </Form.Item>
                                <Form.Item label="Favourite Genres">
                                    <Input
                                        name="favoriteGenres"
                                        value={userDetails.favoriteGenres || ''}
                                        onChange={handleInputChange}
                                    />
                                </Form.Item>
                            </Form>
                        ) : (
                            <>
                                <p><strong>Username: </strong> {userDetails.username}</p>
                                <p><strong>Full Name: </strong> {userDetails.name}</p>
                                <p><strong>Favourite Genres: </strong> {userDetails.favoriteGenres}</p>
                                <p><strong>Email: </strong> {userDetails.email}</p>
                                <p><strong>Membership Status: </strong> {userDetails.membershipType}</p>
                            </>
                        )}
                        <Button type={editMode ? 'primary' : 'default'} onClick={handleEditClick}>
                            {editMode ? 'Save' : 'Edit'}
                        </Button>
                    </Col>
                    <Col span={8}>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76" // Replace with your upload URL
                            beforeUpload={beforeUpload}
                            onChange={handleImageChange}
                            style={{ width: '100%', height: 'auto' }}
                        >
                            {imageUrl ? (
                                <img src={imageUrl} alt="avatar" style={{ width: '100%', height: 'auto' }} />
                            ) : (
                                <div style={{ width: '100%', height: 'auto', padding: '20px' }}>
                                    {loading ? <LoadingOutlined style={{ fontSize: '24px' }} /> : <PlusOutlined style={{ fontSize: '24px' }} />}
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Col>
                </Row>
            </Card>
        </div>
    );

}

export default UserProfile;
