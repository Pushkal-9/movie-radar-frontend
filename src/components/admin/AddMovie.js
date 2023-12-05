import React from 'react';
import {Button, Form, Input, notification} from 'antd';
import {config} from "../common/Constants";
import axios from "axios";


function AddMovie() {
    const onFinish = (values) => {
        console.log('Success:', values);
        instance.put('/admin/add/movie', values,)
            .then(response => {
                    notification.success({
                        message: 'Movie added successfully',
                        description: 'The movie has been added to the database.',
                    });
                }
            )
            .catch(err => {
                console.error('Error:', err);
                notification.error({
                    message: 'Failed to add movie',
                    description: 'There was an error while adding the movie. Please try again.',
                });
            });
    };

    const instance = axios.create({
        baseURL: config.url.API_BASE_URL
    })
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (

        <main>
            <div style={{ textAlign: 'left', width: '80%', marginLeft: '20%' }}>
                <h2>Movie Addition Form</h2>
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
                    label="Name:"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the movie name!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                {/* ... Other form items for language, rating, description, etc. */}
                {/* Example for Language */}
                <Form.Item
                    label="Language:"
                    name="language"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the language!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Rating:"
                    name="rating"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the movie rating!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Description:"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the movie description!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Duration:"
                    name="duration"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the movie duration!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Country:"
                    name="country"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the movie country!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Genre:"
                    name="genre"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the movie genre!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Release Date:"
                    name="releaseDate"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the movie release date!',
                        },
                    ]}
                >
                    <Input placeholder="YYYY-MM-DD"
                    />
                </Form.Item>

                <Form.Item
                    label="Image Link:"
                    name="imageLink"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the movie image link!',
                        },
                    ]}
                >
                    <Input/>
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

export default AddMovie;
