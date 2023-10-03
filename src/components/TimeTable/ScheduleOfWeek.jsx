import React, { useEffect, useState } from 'react';
import { Breadcrumb, Table, DatePicker, Space, Button } from "antd";
import { Link } from "react-router-dom";
import './TimeTable.scss';
import { getAllSchedule } from '../../services/api';
import _ from 'lodash';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import moment from 'moment/moment';

dayjs.extend(customParseFormat);

function ScheduleOfWeek(props) {
    const slots = [
        {
            name: "Slot 0",
            code: "S0",
            day: [
                {
                    code: "MON", subject: {}
                },
                {
                    code: "TUE", subject: {}
                },
                {
                    code: "WED", subject: {}
                },
                {
                    code: "THU", subject: {}
                },
                {
                    code: "FRI", subject: {}
                },
                {
                    code: "SAT", subject: {}
                },
                {
                    code: "SUN", subject: {}
                },
            ]
        },
        {
            name: "Slot 1",
            code: "S1",
            day: [
                {
                    code: "MON", subject: {}
                },
                {
                    code: "TUE", subject: {}
                },
                {
                    code: "WED", subject: {}
                },
                {
                    code: "THU", subject: {}
                },
                {
                    code: "FRI", subject: {}
                },
                {
                    code: "SAT", subject: {}
                },
                {
                    code: "SUN", subject: {}
                },
            ]
        },
        {
            name: "Slot 2",
            code: "S2",
            day: [
                {
                    code: "MON", subject: {}
                },
                {
                    code: "TUE", subject: {}
                },
                {
                    code: "WED", subject: {}
                },
                {
                    code: "THU", subject: {}
                },
                {
                    code: "FRI", subject: {}
                },
                {
                    code: "SAT", subject: {}
                },
                {
                    code: "SUN", subject: {}
                },
            ]
        },
        {
            name: "Slot 3",
            code: "S3",
            day: [
                {
                    code: "MON", subject: {}
                },
                {
                    code: "TUE", subject: {}
                },
                {
                    code: "WED", subject: {}
                },
                {
                    code: "THU", subject: {}
                },
                {
                    code: "FRI", subject: {}
                },
                {
                    code: "SAT", subject: {}
                },
                {
                    code: "SUN", subject: {}
                },
            ]
        },
        {
            name: "Slot 4",
            code: "S4",
            day: [
                {
                    code: "MON", subject: {}
                },
                {
                    code: "TUE", subject: {}
                },
                {
                    code: "WED", subject: {}
                },
                {
                    code: "THU", subject: {}
                },
                {
                    code: "FRI", subject: {}
                },
                {
                    code: "SAT", subject: {}
                },
                {
                    code: "SUN", subject: {}
                },
            ]
        },
        {
            name: "Slot 5",
            code: "S5",
            day: [
                {
                    code: "MON", subject: {}
                },
                {
                    code: "TUE", subject: {}
                },
                {
                    code: "WED", subject: {}
                },
                {
                    code: "THU", subject: {}
                },
                {
                    code: "FRI", subject: {}
                },
                {
                    code: "SAT", subject: {}
                },
                {
                    code: "SUN", subject: {}
                },
            ]
        }
    ];

    const [scheduleOfWeek, setScheduleOfWeek] = useState(slots);
    const [rangeWeek, setRangeWeek] = useState();
    const [sortQuery, setSortQuery] = useState(`startDate=${moment().startOf('week').format('MM/DD/YYYY')}&endDate=${moment().endOf('week').format('MM/DD/YYYY')}`);

    const weekFormat = 'MM/DD';

    const customWeekStartEndFormat = (value) =>
        `${dayjs(value).startOf('week').format(weekFormat)} - ${dayjs(value)
            .endOf('week')
            .format(weekFormat)}`;

    const handleChangeWeek = (date, dateString) => {
        let query = buildRangeWeek(date.$d.getFullYear(), dateString.split(' - '));
        if (query !== sortQuery) {
            setSortQuery(query);
        }
    };

    const columns = [
        {
            title:
                <>
                    <p>WEEK</p>
                    <span>
                        <DatePicker size='small' allowClear={false} defaultValue={dayjs()} format={customWeekStartEndFormat} picker="week" onChange={handleChangeWeek} style={{ cursor: 'pointer' }} />
                    </span>
                </>,
            dataIndex: 'name',
            key: 'name',
            width: '11%'
        },
        {
            title: 'MON',
            dataIndex: 'MON',
            key: 'MON',
            render: (_, record) => renderSubject(record, 'MON'),
        },
        {
            title: 'TUE',
            dataIndex: 'TUE',
            key: 'TUE',
            render: (_, record) => renderSubject(record, 'TUE'),
        },
        {
            title: 'WED',
            dataIndex: 'WED',
            key: 'WED',
            render: (_, record) => renderSubject(record, 'WED'),
        },
        {
            title: 'THU',
            dataIndex: 'THU',
            key: 'THU',
            render: (_, record) => renderSubject(record, 'THU'),
        },
        {
            title: 'FRI',
            dataIndex: 'FRI',
            key: 'FRI',
            render: (_, record) => renderSubject(record, 'FRI'),
        },
        {
            title: 'SAT',
            dataIndex: 'SAT',
            key: 'SAT',
            render: (_, record) => renderSubject(record, 'SAT'),
        },
        {
            title: 'SUN',
            dataIndex: 'SUN',
            key: 'SUN',
            render: (_, record) => renderSubject(record, 'SUN'),
        },
    ];

    const buildRangeWeek = (year, dates) => {
        let query = `startDate=${dates[0]}/${year}&endDate=${dates[1]}/${year}`;
        return query;
    };

    const renderSubject = (record, day) => {
        const subject = record.day.find(item => item.code === day)?.subject;
        if (!_.isEmpty(subject)) {
            return (
                <div key={record?.name}>
                    <p>{subject?.name} - at {subject?.room} abc</p>
                    <div><Button size='small'>Meet URL</Button></div>
                    <div><Button size='small'>EduNext</Button></div>
                </div>
            );
        }
        return <span key={record?.name}>-</span>;
    };

    useEffect(() => {
        fetchSchedule();
    }, [sortQuery]);

    const fetchSchedule = async () => {
        if (sortQuery) {
            let res = await getAllSchedule(sortQuery);
            let cloneSchedule = [...slots];
            if (res && res.dt) {
                cloneSchedule.forEach(slot => {
                    res.dt.forEach(schedule => {
                        if (slot.name === schedule.name) {
                            const foundDay = slot.day.findIndex(item => item.code === schedule.day[0].code);
                            if (foundDay !== -1) {
                                slot.day[foundDay].subject = schedule.day[0].subject;
                            }

                        }
                    });
                });
                setScheduleOfWeek(cloneSchedule);
            }
        }
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
                    <Table size='small' columns={columns} dataSource={scheduleOfWeek} bordered pagination={false} />
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
