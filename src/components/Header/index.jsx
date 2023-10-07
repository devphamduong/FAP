import { useSelector } from 'react-redux';
import './Header.scss';
import { Col, Row, Tag } from "antd";

function Header(props) {
    const user = useSelector(state => state.account.user);

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
                        <Col><Tag color="#87d068">{user?.username}</Tag></Col>
                        <Col><Tag color="#87d068">logout</Tag></Col>
                        <Col><Tag color="#87d068">CAMPUS: FPTU-Hòa Lạc</Tag></Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Header;