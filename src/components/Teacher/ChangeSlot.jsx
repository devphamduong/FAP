import { Breadcrumb, Button, Col, Collapse, DatePicker, Descriptions, Form, Row, Select, Space, notification } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllScheduleForTeacher, getAllSlot, updateSchedule } from "../../services/api";
import { useImmer } from "use-immer";
import moment from "moment";
import _ from "lodash";
import { useSelector } from "react-redux";
import { MdPublishedWithChanges } from 'react-icons/md';

const dateFormatList = "MM/DD/YYYY";

function ChangeSlot(props) {
    const user = useSelector(state => state.account.user);
    const [isLoading, setIsLoading] = useState(false);
    const [listSchedules, setListSchedules] = useState([]);
    const [listCourses, setListCourses] = useImmer([]);
    const [listSlots, setListSlots] = useState([]);
    const [dateChange, setDateChange] = useState();
    const [slotChange, setSlotChange] = useState();
    const [query, setQuery] = useState(`startDate=${moment().format('YYYY/MM/DD')}&teacherId=${user.id}`);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchAllScheduleForTeacher();
        fetchAllSlot();
    }, []);

    const fetchAllScheduleForTeacher = async () => {
        let res = await getAllScheduleForTeacher(query);
        if (res && res.dt) {
            setListSchedules(res.dt);
        }
    };

    const fetchAllSlot = async () => {
        let res = await getAllSlot();
        if (res && res.dt) {
            setListSlots(res.dt);
        }
    };

    useEffect(() => {
        const subjectSet = [];
        if (listSchedules.length > 0) {
            listSchedules.map((item, index) => {
                if (!subjectSet.includes(item.day.subject.name)) {
                    subjectSet.push(item.day.subject.name);
                    setListCourses(draft => {
                        draft[index] = {
                            subject: item.day.subject.name,
                            schedule: [
                                {
                                    scheduleId: item.id,
                                    date: item.date,
                                    slot: item.name,
                                    code: item.code,
                                    day: item.day.code
                                }
                            ]
                        };
                    });
                } else {
                    const foundCourse = subjectSet.findIndex(subject => subject === item.day.subject.name);
                    setListCourses(draft => {
                        draft[foundCourse].schedule = [
                            ...draft[foundCourse].schedule,
                            {
                                scheduleId: item.id,
                                date: item.date,
                                slot: item.name,
                                code: item.code,
                                day: item.day.code
                            }
                        ];
                    });
                }
            });
        }
    }, [listSchedules]);

    const onChange = (date, dateString) => {
        setDateChange(dateString);
    };

    const handleChangeSlot = (value) => {
        setSlotChange(value);
    };

    const checkChangeSlot = (slot, arrSlot) => {
        const currentDate = moment().format('MM/DD/YYYY');
        const currentTime = moment().format('HH:mm');
        const foundSlot = arrSlot.find(item => item.code1 === slot);
        const durationFrom = moment(foundSlot.time[0].duration.split('-')[0], 'HH:mm')._i;
        const durationTo = moment(foundSlot.time[0].duration.split('-')[1], 'HH:mm')._i;
        // console.log(currentTime);
        // console.log(durationFrom, durationTo);
        // console.log(durationFrom <= currentTime, durationTo <= currentTime);
        if (dateChange === currentDate) {
            if (currentTime >= durationFrom && currentTime >= durationTo) {
                notification.error({
                    message: "An error occurred",
                    description: `Slot ${slot.substring(1)} ended at ${durationTo}. You can only switch to later slots.`,
                    duration: 5
                });
                return false;
            } else if (currentTime >= durationFrom && currentTime < durationTo) {
                notification.error({
                    message: "An error occurred",
                    description: `Class started ${moment(durationFrom, 'HH:mm').startOf('hour').fromNow()}. You can only switch to later slots.`,
                    duration: 5
                });
                return false;
            }
        }
        return true;
    };

    const handleChangeSchedule = async (scheduleId) => {
        const dateString = dateChange;
        const date = new Date(dateString);
        const weekday = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
        if (!dateChange || !slotChange) {
            notification.error({
                message: "An error occurred",
                description: "Empty inputs",
                duration: 5
            });
            return;
        }
        let isValid = checkChangeSlot(slotChange, listSlots);
        if (isValid) {
            let res = await updateSchedule({
                scheduleId,
                date: dateChange,
                day: weekday,
                slot: slotChange
            });
            if (res && +res.ec === 0) {
                notification.success({
                    message: "Update successfully",
                    description: res.em,
                    duration: 5
                });
                setDateChange('');
                setSlotChange('');
                form.resetFields();
                await fetchAllScheduleForTeacher();
            } else {
                notification.error({
                    message: "An error occurred",
                    description: res.em,
                    duration: 5
                });
            }
        }
    };

    return (
        <div className="change-slot-container">
            <Breadcrumb
                items={[
                    {
                        title: <Link to={'/'}>Home</Link>,
                    },
                    {
                        title: 'Change slot',
                    }
                ]}
            />
            <div className="change-slot-content">
                <Space direction="vertical" style={{ width: '100%' }}>
                    {listCourses && listCourses.length > 0 &&
                        listCourses.map((itemC, index) => {
                            return (
                                <Collapse key={`course-${itemC.subject}`}
                                    items={[
                                        {
                                            key: index,
                                            label: <>{itemC.subject}</>,
                                            children:
                                                <Space direction="vertical" style={{ width: '100%' }}>
                                                    {
                                                        itemC.schedule.map(itemS => {
                                                            return (
                                                                <Row align={'middle'} key={`Schedule-${itemS.scheduleId}`}>
                                                                    <Col>
                                                                        <Descriptions column={2} size={'small'} bordered items={[
                                                                            {
                                                                                key: index,
                                                                                label: 'Date',
                                                                                children: moment(itemS.date).format("MMMM DD YYYY")
                                                                            },
                                                                            {
                                                                                key: index + 1,
                                                                                label: 'Slot',
                                                                                children: itemS.code.substring(1)
                                                                            }
                                                                        ]} />
                                                                    </Col>
                                                                    <Col><div style={{ display: 'flex', justifyContent: 'center' }}><MdPublishedWithChanges style={{ fontSize: 20 }} /></div></Col>
                                                                    <Col>
                                                                        <Form form={form} layout="inline" style={{ justifyContent: 'center' }}>
                                                                            <Form.Item name='date'>
                                                                                <DatePicker disabledDate={d => !d || d.isBefore(moment(itemS.date, 'YYYY-MM-DD'))} allowClear={false} onChange={onChange} format={dateFormatList} style={{ cursor: 'pointer' }} />
                                                                            </Form.Item>
                                                                            <Form.Item name='slot'>
                                                                                <Select
                                                                                    placeholder="Select a slot"
                                                                                    style={{ width: 120 }}
                                                                                    onChange={handleChangeSlot}>
                                                                                    {
                                                                                        listSlots && listSlots.length > 0 &&
                                                                                        listSlots.map((item, index) => {
                                                                                            return (
                                                                                                <Select.Option key={index} value={item.code1}>
                                                                                                    {item.description}
                                                                                                </Select.Option>
                                                                                            );
                                                                                        })
                                                                                    }

                                                                                </Select>
                                                                            </Form.Item>
                                                                            <Col><Button type="primary" onClick={() => handleChangeSchedule(itemS.scheduleId)}>Change</Button></Col>
                                                                        </Form>
                                                                    </Col>
                                                                </Row>
                                                            );
                                                        })
                                                    }
                                                </Space>
                                        }
                                    ]}
                                />
                            );
                        })
                    }
                </Space>
            </div>
        </div>
    );
}

export default ChangeSlot;