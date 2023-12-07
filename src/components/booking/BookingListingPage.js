import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Spin, Card, Row, Col } from 'antd';
import { config } from "../common/Constants";
import { useAuth } from "../auth/AuthContext";
import {useNavigate} from "react-router-dom";

function BookingList() {
    const [bookings, setBookings] = useState([]);
    const { userIsAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    const instance = axios.create({
        baseURL: config.url.API_BASE_URL
    });

    useEffect(() => {
        if (userIsAuthenticated) {
            let userDetails = JSON.parse(localStorage.getItem('userDetails'));
            instance.get('/booking/all?email=' + userDetails.email)
                .then(response => {
                    const sortedBookings = response.data.sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt));
                    setBookings(sortedBookings);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('There was an error fetching the bookings:', error);
                    setIsLoading(false);
                });
        }
    }, [userIsAuthenticated, instance]);

    const onBookingClick = (booking) => {
        navigate('/booking/'+booking.id+'/details');
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatTime = (dateTimeStr) => {
        return new Date(dateTimeStr).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <Card
                title="Previous Booking"
                bordered={false}
                style={{
                    border: '1px solid #e8e8e8',
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                }}
            >
                <Row gutter={16} style={{ borderBottom: '1px solid #e8e8e8', paddingBottom: '10px', marginBottom: '10px' }}>
                    <Col span={6}><strong>Movie Name</strong></Col>
                    <Col span={6}><strong>Theatre</strong></Col>
                    <Col span={4}><strong>Show Time</strong></Col>
                    <Col span={4}><strong>Amount</strong></Col>
                    <Col span={4}><strong>Booking Date</strong></Col>
                </Row>
                <List
                    itemLayout="horizontal"
                    dataSource={bookings}
                    renderItem={(item, index) => (
                        <Row
                            gutter={16}
                            style={{
                                padding: '20px 0',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                                backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#add8e6'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f5f5f5' : 'white'}
                            onClick={() => onBookingClick(item)}
                        >
                            <Col span={6}>{item.movieName}</Col>
                            <Col span={6}>{item.theatre}</Col>
                            <Col span={4}>{formatTime(item.showTime)}</Col>
                            <Col span={4}>${item.amount}</Col>
                            <Col span={4}>{formatDate(item.bookedAt)}</Col>
                        </Row>
                    )}
                />
            </Card>
        </div>
    );
}

export default BookingList;
