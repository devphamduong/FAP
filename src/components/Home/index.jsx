import { Badge, Card, Col, Divider, Row, Space } from "antd";
import './HomePage.scss';
import { Link } from "react-router-dom";

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
                                        <Badge status="default" text="Register to repeat a course (Đăng ký học lại)" />
                                        <Badge status="default" text="Cancel registration (Hủy đăng ký học)" />
                                        <Badge status="default" text="Register Free Elective Courses (Đăng ký môn tự chọn)" />
                                        <Badge status="default" text="Xin xác nhận sinh viên" />
                                        <Badge status="default" text="Choose paid items (Lựa chọn các khoản nộp) - View" />
                                        <Badge status="default" text="Yêu cầu đổi chéo lớp với sinh viên" />
                                        <Badge status="default" text="Sinh viên điểm danh bằng mã được cấp" />
                                        <Badge status="default" text="Wishlist Course (Danh các môn học chờ lớp )| Register wishlist (Đăng ký)" />
                                    </Space>
                                </Col>
                                <Col span={11}>
                                    <h3>Information Access(Tra cứu thông tin)</h3>
                                    <Space size={'small'} direction="vertical">
                                        <Badge status="default" text="Tuition fee per course (Biểu học phí)" />
                                        <Badge status="processing" text={<><Link to={'/ScheduleOfWeek'}>Weekly timetable</Link> (Thời khóa biểu từng tuần)</>} />
                                        <Badge status="default" text="Blended Online Course (BLOC) Schedules (Lịch học các môn theo phương pháp BLOC trong kỳ)" />
                                        <Badge status="processing" text={<><Link to={'/TimeTable'}>Class timetable</Link> (Xem thời khóa biểu của một lớp)</>} />
                                        <Badge status="default" text="View exam schedule (Xem lịch thi)" />
                                        <Badge status="default" text="View Syllabuses(Xem đề cương môn học)" />
                                        <Badge status="default" text="EduNext student guideline" />
                                        <Badge status="default" text="Help/Hỗ trợ" />
                                        <Badge status="default" text="Tài liệu hướng dẫn: Định hướng cho sinh viên" />
                                    </Space>
                                </Col>
                                <Divider style={{ margin: '10px 0' }} />
                                <Col span={11}>
                                    <h3>Feedback(Ý kiến)</h3>
                                    <Space size={'small'} direction="vertical">
                                        <Badge status="default" text="Feedback about teaching (Ý kiến về việc giảng dạy)" />
                                    </Space>
                                </Col>
                                <Col span={11}>
                                    <h3>Reports(Báo cáo)</h3>
                                    <Space size={'small'} direction="vertical">
                                        <Badge status="default" text="Attendance report (Báo cáo điểm danh)" />
                                        <Badge status="default" text="Mark Report (Báo cáo điểm)" />
                                        <Badge status="default" text="Academic Transcript (Báo cáo điểm)" />
                                        <Badge status="default" text="Student Fee (Tra cứu học phí đã nộp theo kỳ)" />
                                        <Badge status="default" text="Transaction history (Lịch sử giao dịch)" />
                                    </Space>
                                </Col>
                                <Divider style={{ margin: '10px 0' }} />
                                <Col span={11}>
                                    <h3>Others(Khác)</h3>
                                    <Space size={'small'} direction="vertical">
                                        <Badge status="default" text="Student Profile| Update Profile" />
                                        <Badge status="default" text="Attendance report (Báo cáo điểm danh)" />
                                        <Badge status="default" text="View semester, room ( Xem thông tin về học kỳ, phòng)" />
                                        <Badge status="default" text="Các loại chứng chỉ" />
                                        <Badge status="default" text="Report điểm phong trào" />
                                        <Badge status="default" text="How to access Wiley eBook on VitalSource platform" />
                                    </Space>
                                </Col>
                                <Col span={11}>
                                    <h3>Regulations(Các quy định)</h3>
                                    <Space size={'small'} direction="vertical">
                                        <Badge status="default" text="Regulations..." />
                                        <Badge status="default" text="Dormitory regulations (Nội quy KTX)" />
                                        <Badge status="default" text="Dormitory regulations (Nội quy KTX Cần Thơ)" />
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