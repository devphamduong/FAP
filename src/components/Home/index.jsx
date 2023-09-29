import { Badge, Card, Col, Row, Space } from "antd";
import './HomePage.scss';

function HomePage(props) {
    return (
        <div className="home-container">
            <Row justify={'space-between'} className="home-content">
                <Col span={8}>
                    <Badge.Ribbon text="News">
                        <Card className="cart-custom">
                            and raises the spyglass.
                        </Card>
                    </Badge.Ribbon>

                </Col>
                <Col span={15}>
                    <Badge.Ribbon text="Academic Information" color="green">
                        <Card className="cart-custom">
                            <Row justify={'space-between'}>
                                <Col span={11}>
                                    <h3>Registration /Application(Thủ tục/đơn từ)</h3>
                                    <Space size={'small'} direction="vertical">
                                        <Badge status="default" text="Suspend one semester to take repeated course | Cancel (Xin tạm hoãn tiến độ một học kỳ để học lại | Hủy bỏ việc xin tạm hoãn)" />
                                        <Badge status="default" text="Suspend one semester |  Cancel (Xin tạm nghỉ một học kỳ | Hủy bỏ việc xin tạm nghỉ)" />
                                        <Badge status="default" text="Move out class (Xin chuyển lớp)" />
                                        <Badge status="default" text="Register extra courses (Đăng ký môn học đi chậm kỳ)" />
                                        <Badge status="default" text="Register to improve mark  (Đăng ký học cải thiện điểm)" />
                                    </Space>
                                </Col>
                                <Col span={11}>
                                    <h3>Information Access(Tra cứu thông tin)</h3>
                                    <Space size={'small'} direction="vertical">
                                        <Badge status="default" text="Tuition fee per course (Biểu học phí)" />
                                        <Badge status="default" text="Weekly timetable (Thời khóa biểu từng tuần)" />
                                        <Badge status="default" text="Blended Online Course (BLOC) Schedules (Lịch học các môn theo phương pháp BLOC trong kỳ)" />
                                        <Badge status="default" text="Class timetable (Xem thời khóa biểu của một lớp)" />
                                        <Badge status="default" text="View exam schedule (Xem lịch thi)" />
                                    </Space>
                                </Col>
                            </Row>
                        </Card>
                    </Badge.Ribbon>
                </Col>
            </Row>
        </div >
    );
}

export default HomePage;