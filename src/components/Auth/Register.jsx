import { Button, Divider, Form, Input, message, notification } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/api";

function Register(props) {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setIsLoading(true);
        let res = await register(values);
        if (res && +res.ec === 0) {
            // dispatch(loginAction(res.dt));
            message.success(res.em);
            navigate('/login');
        } else {
            notification.error({
                message: "An error occurred",
                description: res.em,
                duration: 5
            });
        }
        setIsLoading(false);
    };

    return (
        <div className="auth-container">
            <div className="register-content">
                <span className="register-name">FPT University Academic Portal</span>
                <Form
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="E-mail"
                        name="email"
                        rules={[
                            { type: 'email', message: 'The input is not valid E-mail' },
                            { required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Full name"
                        name="fullName"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button loading={isLoading} style={{ width: '100%' }} type="primary" shape="round" htmlType="submit" className="login-form-button">
                            Sign Up
                        </Button>
                    </Form.Item>
                    <Divider>Or</Divider>
                    <p>Already have an account?
                        <span>
                            <Link to={'/login'}> Log In</Link>
                        </span>
                    </p>
                </Form>
            </div>
        </div>
    );
}

export default Register;