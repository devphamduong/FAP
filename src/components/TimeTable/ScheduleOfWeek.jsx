import React, { useEffect, useState } from 'react';
import { Breadcrumb, Table, DatePicker, Space, Button, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import './TimeTable.scss';
import { getAllSchedule } from '../../services/api';
import _ from 'lodash';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';

const weekFormat = 'MM/DD';
dayjs.extend(customParseFormat);

const { Text } = Typography;

function ScheduleOfWeek(props) {
    const navigate = useNavigate();
    const user = useSelector(state => state.account.user);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const originalSlots = [];
    for (let i = 0; i <= 12; i++) {
        const slot = {
            name: `Slot ${i}`,
            code: `S${i}`,
            duration: '',
            room: '',
            day: [
                {
                    code: "MON", subject: {}, hasEduNext: false
                },
                {
                    code: "TUE", subject: {}, hasEduNext: false
                },
                {
                    code: "WED", subject: {}, hasEduNext: false
                },
                {
                    code: "THU", subject: {}, hasEduNext: false
                },
                {
                    code: "FRI", subject: {}, hasEduNext: false
                },
                {
                    code: "SAT", subject: {}, hasEduNext: false
                },
                {
                    code: "SUN", subject: {}, hasEduNext: false
                }
            ],
        };
        originalSlots.push(slot);
    }
    const slots = [...originalSlots];

    const [scheduleOfWeek, setScheduleOfWeek] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sortQuery, setSortQuery] = useState(`startDate=${moment().startOf('week').format('MM/DD/YYYY')}&endDate=${moment().endOf('week').format('MM/DD/YYYY')}`);
    const [currentWeek, setCurrentWeek] = useState(moment(moment().endOf('week').format('MM/DD/YYYY'), 'MM/DD/YYYY').isoWeek());

    const customWeekStartEndFormat = (value) =>
        `${dayjs(value).startOf('week').format(weekFormat)} - ${dayjs(value).endOf('week').format(weekFormat)}`;

    const handleChangeWeek = (date, dateString) => {
        let query = buildRangeWeek(date.$d.getFullYear(), dateString.split(' - '));
        if (query !== sortQuery) {
            setSortQuery(query);
            let chosenWeek = moment(`${date.$d.getMonth() + 1}/${date.$d.getDate()}/${date.$d.getFullYear()}`, 'MM/DD/YYYY').week();
            setCurrentWeek(chosenWeek);
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
            title:
                <>
                    <p>MON</p>
                    <span>{moment().day("MON").week(currentWeek).format('MM/DD')}</span>
                </>,
            dataIndex: 'MON',
            key: 'MON',
            render: (_, record) => renderSubject(record, 'MON'),
        },
        {
            title:
                <>
                    <p>TUE</p>
                    <span>{moment().day("TUE").week(currentWeek).format('MM/DD')}</span>
                </>,
            dataIndex: 'TUE',
            key: 'TUE',
            render: (_, record) => renderSubject(record, 'TUE'),
        },
        {
            title:
                <>
                    <p>WED</p>
                    <span>{moment().day("WED").week(currentWeek).format('MM/DD')}</span>
                </>,
            dataIndex: 'WED',
            key: 'WED',
            render: (_, record) => renderSubject(record, 'WED'),
        },
        {
            title:
                <>
                    <p>THU</p>
                    <span>{moment().day("THU").week(currentWeek).format('MM/DD')}</span>
                </>,
            dataIndex: 'THU',
            key: 'THU',
            render: (_, record) => renderSubject(record, 'THU'),
        },
        {
            title:
                <>
                    <p>FRI</p>
                    <span>{moment().day("FRI").week(currentWeek).format('MM/DD')}</span>
                </>,
            dataIndex: 'FRI',
            key: 'FRI',
            render: (_, record) => renderSubject(record, 'FRI'),
        },
        {
            title:
                <>
                    <p>SAT</p>
                    <span>{moment().day("SAT").week(currentWeek).format('MM/DD')}</span>
                </>,
            dataIndex: 'SAT',
            key: 'SAT',
            render: (_, record) => renderSubject(record, 'SAT'),
        },
        {
            title:
                <>
                    <p>SUN</p>
                    <span>{moment().day("SUN").week(currentWeek + 1).format('MM/DD')}</span>
                </>,
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
        const schedule = record.day.find(item => item.code === day);
        const subject = record.day.find(item => item.code === day)?.subject;
        if (!_.isEmpty(subject)) {
            const courseHasEduNext = record.day.findIndex(item => item.code === day && item.hasEduNext === true);
            return (
                <>
                    <p><Link to={`/ActivityDetail/Schedule/${schedule.id}`}>{subject?.name}</Link> - at {record.room}</p>
                    <div><Button size='small' style={{ color: 'white', fontWeight: 700, backgroundColor: '#777' }}>Meet URL</Button></div>
                    {courseHasEduNext > -1 && record.day[courseHasEduNext] &&
                        <div><Button size='small' style={{ color: 'white', fontWeight: 700, backgroundColor: '#337ab7' }}>EduNext</Button></div>
                    }
                    <div>(Not yet)</div>
                    <Text strong children={
                        <code style={{ color: 'white', backgroundColor: '#5cb85c' }}>({record.duration})</code>
                    } />
                </>
            );
        }
        return <>-</>;
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        fetchSchedule();
    }, [sortQuery]);

    const fetchSchedule = async () => {
        setIsLoading(true);
        setScheduleOfWeek(slots);
        if (sortQuery) {
            let res = await getAllSchedule(sortQuery);
            if (res && res.dt && res.dt.length > 0) {
                let cloneSchedule = [...slots];
                cloneSchedule.forEach(slot => {
                    res.dt.forEach(schedule => {
                        if (slot.name === schedule.name) {
                            slot.duration = schedule.duration;
                            slot.room = schedule.room;
                            const foundDay = slot.day.findIndex(item => item.code === schedule.day.code);
                            if (foundDay !== -1) {
                                slot.day[foundDay].id = schedule.id;
                                slot.day[foundDay].subject = schedule.day.subject;
                                slot.day[foundDay].hasEduNext = schedule.day.hasEduNext;
                            }

                        }
                    });
                });
                setScheduleOfWeek(cloneSchedule);
            }
        }
        setIsLoading(false);
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
                    <span className="schedule-of-account">Activities for {user?.username} ({user?.fullName})</span>
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
                <Button onClick={() => navigate('/Teacher/ChangeSlot')}>Change slot</Button>
                <div>
                    <Table rowKey={'name'} loading={isLoading} size='small' columns={columns} dataSource={scheduleOfWeek} bordered pagination={false} />
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
