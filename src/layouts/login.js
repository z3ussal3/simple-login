import React, { useState } from "react";
import { Form, Icon, Input, Row, Col, Button, notification } from 'antd';
import { withApollo, Query } from 'react-apollo';
import './login.css';
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import { QUERY_USER } from '../graphql/queries/todo';

const { Item } = Form;

const LoginApp = ({ history, form, client }) => {
    const { getFieldDecorator } = form;
    const { test, newTest } = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields(async (err, { username, password }) => {
            if (!err) {
                console.log('Received values of form: ', username + " " + password);
                try {
                    const data = await client.query({
                        query: QUERY_USER,
                        variables: {
                            username: username,
                            password: password
                        }
                    });

                    if (data.data.Users.length == 1) {
                        notification.success({
                            message: 'Welcome to Mobile Legend',
                            description: 'Good job',
                        });

                        await history.push('/dashboard');
                    } else {
                        notification.error({
                            message: 'Invalid username and password!',
                            description: 'Bad job',
                        });
                    }
                } catch (e) {

                }
            }
        });
    }

    const [newUsername, setNewUsername] = useState(0);
    const handleUsernameInput = (e) => {
        const { value, maxLength } = e.target;
        const newUsername = value.slice(0, maxLength);

        setNewUsername(newUsername);
    }

    return (
        <>
            <Row style={{ margin: "0 10px" }}>
                <Col
                    xs={{ span: 22, offset: 1 }}
                    sm={{ span: 16, offset: 4 }}
                    md={{ span: 12, offset: 6 }}
                    lg={{ span: 8, offset: 8 }}>
                    <Form onSubmit={handleSubmit} className="login-form">
                        <Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    { required: true, message: 'Please input your username!' },
                                    { min: 8, message: 'Username should be 8 to 15 characters!' },
                                    { max: 15, message: 'Husto na!' }
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    maxLength={15}
                                    setfieldsvalue={newUsername}
                                    onChange={handleUsernameInput}
                                    placeholder="Username"
                                />,
                            )}
                        </Item>
                        <Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input.Password
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Password"
                                />,
                            )}
                        </Item>
                        <Item>
                            {/* <Checkbox>Remember me</Checkbox>
                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a> */}
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                             </Button>
                            Or <Link to='/register'>Register</Link>
                        </Item>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default compose(
    withApollo,
    withRouter,
    Form.create({ name: 'login_app' })
)(LoginApp);