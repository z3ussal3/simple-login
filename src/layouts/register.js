import React, { useState } from "react";
import {
    Form,
    Input,
    Row,
    Col,
    Button,
    notification
} from 'antd';
import { withApollo } from 'react-apollo';
import './login.css';
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import { MUTATION_REGISTER_USER } from '../graphql/mutations/todo';

const { Item } = Form;

const RegisterApp = ({ history, form, client }) => {
    const { getFieldDecorator } = form;

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    const [newUsername, setNewUsername] = useState(0);
    const handleUsernameInput = (e) => {
        const { value, maxLength } = e.target;
        const newUsername = value.slice(0, maxLength);

        setNewUsername(newUsername);
    }

    const [confirmDirty, newConfirmDirty] = useState(false);

    const handleConfirmBlur = e => {
        const { value } = e.target;
        newConfirmDirty({ confirmDirty: confirmDirty || !!value });
    };
    const compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };
    const validateToNextPassword = (rule, value, callback) => {
        if (value && confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields(async (err, { username, password }) => {
            if (!err) {
                console.log('Received values of form: ', username + " " + password);
                try {
                    await client.mutate({
                        mutation: MUTATION_REGISTER_USER,
                        variables: {
                            username: username,
                            password: password
                        }
                    });

                    notification.success({
                        message: 'Done logging in',
                        description: 'Good job',
                    });

                    await history.push('/login');
                } catch (e) {
                    notification.error({
                        message: 'Oh no!!!',
                        description: 'Bad job',
                    });
                }
            }
        });
    }

    return (
        <>
            <Row style={{ margin: "0 10px" }}>
                <Col
                    xs={{ span: 22, offset: 1 }}
                    sm={{ span: 16, offset: 4 }}
                    md={{ span: 12, offset: 6 }}
                    lg={{ span: 8, offset: 8 }}>
                    <Form {...formItemLayout} onSubmit={handleSubmit} className="login-form">
                        <Item label="Username">
                            {getFieldDecorator('username', {
                                rules: [
                                    { required: true, message: 'Please input your username!' },
                                    { min: 8, message: 'Username should be 8 to 15 characters!' },
                                    { max: 15, message: 'Husto na!' }
                                ],
                            })(
                                <Input
                                    maxLength={15}
                                    setfieldsvalue={newUsername}
                                    onChange={handleUsernameInput}
                                />,
                            )}
                        </Item>
                        <Item label="Password" hasFeedback>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                    {
                                        validator: validateToNextPassword,
                                    },
                                ],
                            })(<Input.Password />)}
                        </Item>
                        <Item label="Confirm Password" hasFeedback>
                            {getFieldDecorator('confirm', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    {
                                        validator: compareToFirstPassword,
                                    },
                                ],
                            })(<Input.Password onBlur={handleConfirmBlur} />)}
                        </Item>
                        <Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Register
                             </Button>
                            Or <Link to='/login'>Sign in instead</Link>
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
    Form.create({ name: 'register_app' })
)(RegisterApp);