import React, { useState, useEffect } from 'react';
import { Button, Form, Input, notification, Select, DatePicker, TimePicker } from 'antd';
import { config } from "../common/Constants";
import axios from "axios";
import moment from 'moment';


const { Option } = Select;

function AddShow() {
    const [cities, setCities] = useState([]);
    const [movies, setMovies] = useState([]);
    const [screens, setScreens] = useState([]);
    const [theatres, setTheatres] = useState([]);
    const [loadingCities, setLoadingCities] = useState(false);
    const [loadingMovies, setLoadingMovies] = useState(false);
    const [loadingScreens, setLoadingScreens] = useState(false);
    const [loadingTheatres, setLoadingTheatres] = useState(false);


    const validateDate = (_, value) => {
        if (value && !moment(value, 'YYYY-MM-DD', true).isValid()) {
            return Promise.reject('Please enter a valid date (YYYY-MM-DD)');
        }
        return Promise.resolve();
    };

    const validateTime = (_, value) => {
        if (value && !moment(value, 'HH:mm', true).isValid()) {
            return Promise.reject('Please enter a valid time (HH:mm)');
        }
        return Promise.resolve();
    };

    useEffect(() => {
        fetchCities();
        fetchMovies();
    }, []);

    const fetchCities = () => {
        setLoadingCities(true);
        instance.get('/search/city')
            .then(response => {
                setCities(response.data);
                setLoadingCities(false);
            })
            .catch(error => {
                console.error('Error fetching cities:', error);
                setLoadingCities(false);
            });
    };

    const fetchMovies = () => {
        setLoadingMovies(true);
        instance.get('/search/all/movies')
            .then(response => {
                setMovies(response.data);
                setLoadingMovies(false);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
                setLoadingMovies(false);
            });
    };

    const fetchScreensByTheatre = (theatreId) => {
        setLoadingScreens(true);
        instance.get('/search/screen', {
            params: {
                theatre_id: theatreId
            }
        })
            .then(response => {
                setScreens(response.data);
                setLoadingScreens(false);
            })
            .catch(error => {
                console.error('Error fetching screens:', error);
                setLoadingScreens(false);
            });
    };

    const fetchTheatresByCity = (cityId) => {
        setLoadingTheatres(true);
        instance.get('/search/theatre', {
            params: {
                city_id: cityId
            }
        })
            .then(response => {
                setTheatres(response.data);
                setLoadingTheatres(false);
            })
            .catch(error => {
                console.error('Error fetching theatres:', error);
                setLoadingTheatres(false);
            });
    };

    const instance = axios.create({
        baseURL: config.url.API_BASE_URL
    });

    const onFinish = (values) => {
        console.log('Success:', values);
        instance.put('/admin/add/shows', values)
            .then(response => {
                notification.success({
                    message: 'Show added successfully',
                    description: 'The show has been added to the database.',
                });
            })
            .catch(err => {
                console.error('Error:', err);
                notification.error({
                    message: 'Failed to add show',
                    description: 'There was an error while adding the show. Please try again.',
                });
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <main>
            <div style={{ textAlign: 'left', width: '80%', marginLeft: '20%' }}>
                <h1>Add Show</h1>
            </div>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Date:"
                    name="date"
                    rules={[
                        {
                            required: true,
                            message: 'Please select the date!',
                        },
                        {
                            validator: validateDate,
                        }
                    ]}
                >
                    <Input placeholder={'YYYY-MM-DD'} />
                </Form.Item>

                <Form.Item
                    label="Start Time:"
                    name="startTime"
                    rules={[
                        {
                            required: true,
                            message: 'Please select the start time!',
                        },
                        {
                            validator: validateTime,
                        }
                    ]}
                >
                    <Input placeholder={'HH:MM'}  />
                </Form.Item>

                <Form.Item
                    label="Movie:"
                    name="movieId"
                    rules={[
                        {
                            required: true,
                            message: 'Please select the movie!',
                        },
                    ]}
                >
                    <Select loading={loadingMovies}>
                        {movies.map(movie => (
                            <Option key={movie.id} value={movie.id}>
                                {movie.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="City:"
                    name="cityId"
                    rules={[
                        {
                            required: true,
                            message: 'Please select the city!',
                        },
                    ]}
                >
                    <Select loading={loadingCities} onChange={fetchTheatresByCity}>
                        {cities.map(city => (
                            <Option key={city.id} value={city.id}>
                                {city.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Theatre:"
                    name="theatreId"
                    rules={[
                        {
                            required: true,
                            message: 'Please select the theatre!',
                        },
                    ]}
                >
                    <Select loading={loadingTheatres} onChange={fetchScreensByTheatre}>
                        {theatres.map(theatre => (
                            <Option key={theatre.id} value={theatre.id}>
                                {theatre.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Screen:"
                    name="screenId"
                    rules={[
                        {
                            required: true,
                            message: 'Please select the screen!',
                        },
                    ]}
                >
                    <Select loading={loadingScreens}>
                        {screens.map(screen => (
                            <Option key={screen.id} value={screen.id}>
                                {screen.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </main>
    );
}

export default AddShow;
