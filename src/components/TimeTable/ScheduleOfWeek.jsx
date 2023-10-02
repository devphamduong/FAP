import React from 'react';
import { Breadcrumb, Space, Table } from "antd";
import { Link } from "react-router-dom";
import './TimeTable.scss';

function ScheduleOfWeek(props) {
    const slots = [
        {
            name: "Slot 0",
            code: "S0",
            day: [
                {
                    code: "MON", subject: []
                },
                {
                    code: "TUE", subject: []
                },
                {
                    code: "WED", subject: []
                },
                {
                    code: "THU", subject: []
                },
                {
                    code: "FRI", subject: []
                },
                {
                    code: "SAT", subject: []
                },
                {
                    code: "SUN", subject: []
                },
            ]
        },
        {
            name: "Slot 1",
            code: "S1",
            day: [
                {
                    code: "MON", subject: []
                },
                {
                    code: "TUE", subject: []
                },
                {
                    code: "WED", subject: []
                },
                {
                    code: "THU", subject: []
                },
                {
                    code: "FRI", subject: []
                },
                {
                    code: "SAT", subject: []
                },
                {
                    code: "SUN", subject: []
                },
            ]
        },
        {
            name: "Slot 2",
            code: "S2",
            day: [
                {
                    code: "MON", subject: []
                },
                {
                    code: "TUE", subject: []
                },
                {
                    code: "WED", subject: []
                },
                {
                    code: "THU", subject: []
                },
                {
                    code: "FRI", subject: []
                },
                {
                    code: "SAT", subject: []
                },
                {
                    code: "SUN", subject: []
                },
            ]
        },
        {
            name: "Slot 3",
            code: "S3",
            day: [
                {
                    code: "MON", subject: [
                        { name: "MLN111", room: "BE-206", slot: "S3" }
                    ]
                },
                {
                    code: "TUE", subject: [
                        { name: "PRN231", room: "DE-229", slot: "S3" }
                    ]
                },
                {
                    code: "WED", subject: []
                },
                {
                    code: "THU", subject: []
                },
                {
                    code: "FRI", subject: []
                },
                {
                    code: "SAT", subject: []
                },
                {
                    code: "SUN", subject: []
                },
            ]
        },
        {
            name: "Slot 4",
            code: "S4",
            day: [
                {
                    code: "MON", subject: []
                },
                {
                    code: "TUE", subject: []
                },
                {
                    code: "WED", subject: [
                        { name: "EXE201", room: "DE-C308", slot: "S4" }
                    ]
                },
                {
                    code: "THU", subject: [
                        { name: "MLN111", room: "BE-206", slot: "S4" }
                    ]
                },
                {
                    code: "FRI", subject: [
                        { name: "PRN231", room: "DE-229", slot: "S4" }
                    ]
                },
                {
                    code: "SAT", subject: [
                        { name: "WDU203c", room: "DE-212", slot: "S4" }
                    ]
                },
                {
                    code: "SUN", subject: []
                },
            ]
        },
        {
            name: "Slot 5",
            code: "S5",
            day: [
                {
                    code: "MON", subject: []
                },
                {
                    code: "TUE", subject: []
                },
                {
                    code: "WED", subject: []
                },
                {
                    code: "THU", subject: []
                },
                {
                    code: "FRI", subject: []
                },
                {
                    code: "SAT", subject: [
                        { name: "PMG202c", room: "DE-C204" }
                    ]
                },
                {
                    code: "SUN", subject: []
                },
            ]
        }
    ];

    const columns = [
        {
            title: 'WEEK',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'MON',
            dataIndex: 'MON',
            key: 'MON',
            render: (_, record) => rendersubject(record, 'MON'),
        },
        {
            title: 'TUE',
            dataIndex: 'TUE',
            key: 'TUE',
            render: (_, record) => rendersubject(record, 'TUE'),
        },
        {
            title: 'WED',
            dataIndex: 'WED',
            key: 'WED',
            render: (_, record) => rendersubject(record, 'WED'),
        },
        {
            title: 'THU',
            dataIndex: 'THU',
            key: 'THU',
            render: (_, record) => rendersubject(record, 'THU'),
        },
        {
            title: 'FRI',
            dataIndex: 'FRI',
            key: 'FRI',
            render: (_, record) => rendersubject(record, 'FRI'),
        },
        {
            title: 'SAT',
            dataIndex: 'SAT',
            key: 'SAT',
            render: (_, record) => rendersubject(record, 'SAT'),
        },
        {
            title: 'SUN',
            dataIndex: 'SUN',
            key: 'SUN',
            render: (_, record) => rendersubject(record, 'SUN'),
        },
    ];

    const rendersubject = (record, day) => {
        const subject = record.day.find(item => item.code === day)?.subject;
        if (subject && subject.length > 0) {
            return (
                <div key={record.name}>
                    <p>{subject[0].name}</p>
                    <p>at {subject[0].room}</p>
                </div>
            );
        }
        return '-';
    };

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
                    <Table columns={columns} dataSource={slots} bordered />
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
