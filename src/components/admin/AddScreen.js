import React,  {useState, useEffect} from 'react';
import { Button, Form, Input, notification, Select } from 'antd';
import { config } from "../common/Constants";
import axios from "axios";

const { Option } = Select;

function AddScreen() {
    const [cities, setCities] = useState([]);
    const [theatres, setTheatres] = useState([]);
    const [loadingCities, setLoadingCities] = useState(false);
    const [loadingTheatres, setLoadingTheatres] = useState(false);

    useEffect(() => {
        fetchCities();
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
    const onFinish = (values) => {
        console.log('Success:', values);
        instance.put('/admin/add/screen', values)
            .then(response => {
                notification.success({
                    message: 'Screen added successfully',
                    description: 'The screen has been added to the database.',
                });
            })
            .catch(err => {
                console.error('Error:', err);
                notification.error({
                    message: 'Failed to add screen',
                    description: 'There was an error while adding the screen. Please try again.',
                });
            });
    };

    const instance = axios.create({
        baseURL: config.url.API_BASE_URL
    });

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <main >
            <div style={{ textAlign: 'left', width: '80%', marginLeft: '20%' }}>
                <h1>Add Screen</h1>
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
                    <Select loading={loadingTheatres}>
                        {theatres.map(theatre => (
                            <Option key={theatre.id} value={theatre.id}>
                                {theatre.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Screen Name:"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the screen name!',
                        },
                    ]}
                >
                    <Input />
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

export default AddScreen;
