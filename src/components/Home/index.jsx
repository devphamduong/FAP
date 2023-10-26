import { Badge, Button, Card, Col, Divider, Row, Space, Table, Typography } from "antd";
import './HomePage.scss';
import { Link } from "react-router-dom";
const { Text } = Typography;

function HomePage(props) {
    const columns = [
        {
            title: 'Type of procedure | Loại thủ tục',
            dataIndex: 'procedure',
        },
        {
            title: 'Deadline | Hạn nộp Đơn',
            dataIndex: 'deadline',
            onCell: (_, index) => {
                if (index === 0) {
                    return { rowSpan: 2 };
                }
                if (index === 2) {
                    return { rowSpan: 1 };
                }
                if (index === 3) {
                    return { rowSpan: 8 };
                }
                if (index >= 4 && index <= 10) {
                    return { rowSpan: 0 };
                }
                if (index > 10) {
                    return { rowSpan: 1 };
                }
                return { rowSpan: 0 };
            },
        },
    ];

    const data = [
        {
            procedure: <><span className="custom-notice">1. Changing major </span>(Chuyển ngành)</>,
            deadline: <><span className="custom-notice">4 weeks before the new semester </span>(4 tuần  trước học kỳ mới)</>,
        },
        {
            procedure: <><span className="custom-notice">2. Changing campus </span>(Chuyển cơ sở)</>,
        },
        {
            procedure: <><span className="custom-notice">3. Rejoin </span>(Nhập học trở lại)</>,
            deadline: <><span className="custom-notice">10 days before the new semester </span>(10 ngày trước học kỳ mới)</>,
        },
        {
            procedure: <><span className="custom-notice">4. Suspend one semester </span>(Bảo lưu học kỳ)</>,
            deadline: <><span className="custom-notice">1 week before the new semester </span>(1 tuần trước học kỳ mới)</>,
        },
        {
            procedure: <><span className="custom-notice">5. Suspend one semester to take repeated course </span>(Tạm ngưng tiến độ 1 học kỳ để học lại)</>,
        },
        {
            procedure: <><span className="custom-notice">6. Suspend subject </span>(Tạm ngừng môn)</>,
        },
        {
            procedure: <><span className="custom-notice">7. Register to repeat a course </span>(Đăng ký học lại)</>,
        },
        {
            procedure: <><span className="custom-notice">8. Register extra courses </span>(Đăng ký học đi chậm kỳ)</>,
        },
        {
            procedure: <><span className="custom-notice">9. Register to improve mark </span>(Đăng ký học cải thiện)</>,
        },
        {
            procedure: <><span className="custom-notice">10. Move out class </span>(Chuyển lớp)</>,
        },
        {
            procedure: <><span className="custom-notice">11. Request a drop out </span>(Thôi học tự nguyện)</>,
        },
        {
            procedure: <><span className="custom-notice">12. Retake to improve mark </span>(Thi cải thiện)</>,
            deadline: <><span className="custom-notice">12 hours before the final exam resit </span>(12h trước lịch thi lại)</>,
        },
        {
            procedure: <><span className="custom-notice">13. Re – Examination </span>(Phúc tra)</>,
            deadline: <><span className="custom-notice">4 days after the  examination result public </span>(4 ngày sau ngày công bố kết quả)</>,
        },
        {
            procedure: <><span className="custom-notice">14. Free of attendance </span>(Miễn điểm danh)</>,
            deadline: <><span className="custom-notice">2 weeks after starting the new semester </span>(2 tuần sau khi học kỳ mới bắt đầu)</>,
        },
        {
            procedure: <><span className="custom-notice">15. Pay specialized tuition </span>(Nộp học phí chuyên ngành)</>,
            deadline: <><span className="custom-notice">5 working days before the new semester </span>(5 ngày trước học kỳ học mới không tính T7, CN)</>,
        },
        {
            procedure: <><span className="custom-notice">16. Pay preparetation English tuition </span>(Nộp học phí Tiếng Anh dự bị)</>,
            deadline: <><span className="custom-notice">3 working days before the new course </span>(3 ngày trước khi bắt đầu khóa học không tính T7, CN)</>,
        },
    ];

    return (
        <div className="home-container">
            <Row justify={'space-between'} className="home-content">
                <Col span={8}>
                    <Badge.Ribbon text="News">
                        <Card className="cart-custom">
                            <div style={{ marginBottom: 10 }}><strong>Tin tức </strong><Button style={{ backgroundColor: '#eea742', color: 'white' }}>Xem tại đây</Button></div>
                            <div style={{ textAlign: 'center' }}><Text type="danger"><strong style={{ fontSize: 20 }}>IMPORTANT  NOTICE</strong></Text></div>
                            <Table size="small" columns={columns} dataSource={data} bordered pagination={false} />
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
                                        <Badge status="default" text="Wishlist Course (Danh các môn học chờ lớp ) | Register wishlist (Đăng ký)" />
                                    </Space>
                                </Col>
                                <Col span={11}>
                                    <h3>Information Access(Tra cứu thông tin)</h3>
                                    <Space size={'small'} direction="vertical">
                                        <Badge status="default" text="Tuition fee per course (Biểu học phí)" />
                                        <Badge status="processing" text={<><Link to={'/ScheduleOfWeek'}>Weekly timetable</Link> (Thời khóa biểu từng tuần)</>} />
                                        <Badge status="default" text="Blended Online Course (BLOC) Schedules (Lịch học các môn theo phương pháp BLOC trong kỳ)" />
                                        <Badge status="default" text={"Class timetable (Xem thời khóa biểu của một lớp)"} />
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