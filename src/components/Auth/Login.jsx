import { Button, Divider, Form, Input, message, notification } from "antd";
import './Auth.scss';
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from '../../services/api';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/account/accountSlice";

function Login() {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.account.isAuthenticated);

    const onFinish = async (values) => {
        setIsLoading(true);
        let res = await login(values);
        if (res && res.dt) {
            localStorage.setItem('access_token', res.dt.access_token);
            dispatch(loginAction(res.dt.user));
            message.success(res.em);
            navigate('/');
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
            <div className="login-content">
                <span className="login-name">FPT University Academic Portal</span>
                <Form
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button loading={isLoading} style={{ width: '100%' }} type="primary" shape="round" htmlType="submit" className="login-form-button">
                            Log In
                        </Button>
                    </Form.Item>
                    <Divider>Or</Divider>
                    <p>Don't have an account?
                        <span>
                            <Link to={'/Register'}> Sign Up</Link>
                        </span>
                    </p>
                </Form>
            </div>
        </div>
    );
}

export default Login;