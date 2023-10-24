import { useDispatch, useSelector } from 'react-redux';
import './Header.scss';
import { Col, Row, Tag, message } from "antd";
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../../redux/account/accountSlice';
import { logout } from '../../services/api';

function Header(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.account.user);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const navigate = useNavigate();

    const handleLogout = async () => {
        let res = await logout();
        if (res && +res.ec === 0) {
            message.success("Logout successfully");
            dispatch(logoutAction());
            navigate('/Login');
        }
    };

    return (
        <>
            <Row className="header-container" align={'middle'} justify={'space-between'}>
                <Col span={12}>
                    <Row align={'middle'}>
                        <Col><span className="header-name">FPT University Academic Portal</span></Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row align={'middle'} justify={'end'}>
                        {isAuthenticated && user?.username && <Col><Tag color="#87d068">{user?.username}</Tag></Col>}
                        {isAuthenticated
                            ? <Col><Tag color="#87d068" style={{ cursor: 'pointer' }} onClick={() => handleLogout()}>Logout</Tag></Col>
                            : <Col><Tag color="#87d068" style={{ cursor: 'pointer' }} onClick={() => navigate('/Login')}>Login</Tag></Col>
                        }
                        <Col><Tag color="#87d068">CAMPUS: FPTU-Hòa Lạc</Tag></Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Header;