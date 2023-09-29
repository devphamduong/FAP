import { Breadcrumb, Space } from "antd";
import { Link } from "react-router-dom";
import './TimeTable.scss';

function ScheduleOfWeek(props) {
    const numberOfWeeks = 4;

    const weekHeaders = Array.from({ length: 7 }, (_, index) => {
        const date = new Date();
        date.setDate(date.getDate() + index);
        return date.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: '2-digit' });
    });

    const weeks = Array.from({ length: numberOfWeeks }, (_, weekIndex) => (
        <tr key={weekIndex}>
            <th>Week {weekIndex + 1}</th>
            {weekHeaders.map((date, dateIndex) => (
                <td key={dateIndex}>-</td>
            ))}
        </tr>
    ));

    return (
        <div className="schedule-container">
            <Breadcrumb
                items={[
                    {
                        title: <Link to={'/'}>Home</Link>,
                    },
                    {
                        title: 'ScheduleOfWeek',
                    }
                ]}
            />
            <div className="schedule-content">
                <div>
                    <span className="schedule-of-account">Activities for duongpche163153 (Phạm Chu Dương)</span>
                </div>
                <Space direction="vertical" style={{ marginTop: '10px' }}>
                    <p><span style={{ fontWeight: 'bold' }}>Note</span>: These activities do not include extra-curriculum activities, such as club activities ...</p>
                    <p><span style={{ fontWeight: 'bold' }}>Chú thích</span>: Các hoạt động trong bảng dưới không bao gồm hoạt động ngoại khóa, ví dụ như hoạt động câu lạc bộ ...</p>
                </Space>
                <div style={{ margin: '10px 0' }}>
                    <p>Các phòng bắt đầu bằng AL thuộc tòa nhà Alpha. VD: AL...</p>
                    <p>Các phòng bắt đầu bằng BE thuộc tòa nhà Beta. VD: BE,..</p>
                    <p>Các phòng bắt đầu bằng G thuộc tòa nhà Gamma. VD: G201,...</p>
                    <p>Các phòng tập bằng đầu bằng R thuộc khu vực sân tập Vovinam.</p>
                    <p>Các phòng bắt đầu bằng DE thuộc tòa nhà Delta. VD: DE,..</p>
                    <p>Little UK (LUK) thuộc tầng 5 tòa nhà Delta</p>
                </div>
                <div>
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>Week</th>
                                {weekHeaders.map((date, index) => (
                                    <th key={index}>{date}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {weeks}
                        </tbody>
                    </table>
                </div>
                <p><span style={{ fontWeight: 'bold' }}>More note / Chú thích thêm</span>:</p>
                <ul>
                    <li>(<span style={{ color: 'green' }}>attended</span>): duongpche163153 had attended this activity / Phạm Chu Dương đã tham gia hoạt động này</li>
                    <li>(<span style={{ color: 'red' }}>absent</span>): duongpche163153 had NOT attended this activity / Phạm Chu Dương đã vắng mặt buổi này</li>
                    <li>(-): no data was given / chưa có dữ liệu</li>
                </ul>
            </div>
        </div>
    );
}

export default ScheduleOfWeek;