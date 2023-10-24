import { useSelector } from 'react-redux';
import './Header.scss';
import { Col, Row, Tag } from "antd";
import { useNavigate } from 'react-router-dom';

function Header(props) {
    const user = useSelector(state => state.account.user);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const navigate = useNavigate();

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
                            ? <Col><Tag color="#87d068" style={{ cursor: 'pointer' }} onClick={() => navigate('/Login')}>Logout</Tag></Col>
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