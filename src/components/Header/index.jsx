import './Header.scss';
import { Col, Row, Tag } from "antd";

function Header(props) {
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
                        <Col><Tag color="#87d068">duongpche163153</Tag></Col>
                        <Col><Tag color="#87d068">logout</Tag></Col>
                        <Col><Tag color="#87d068">CAMPUS: FPTU-Hòa Lạc</Tag></Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Header;