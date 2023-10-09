import { Breadcrumb, Button, Col, Collapse, DatePicker, Descriptions, Row, Select, Space, notification } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllScheduleForTeacher, getAllSlot, updateSchedule } from "../../services/api";
import { useImmer } from "use-immer";
import moment from "moment";
import _ from "lodash";
import { useSelector } from "react-redux";

const dateFormatList = "MM/DD/YYYY";

function ChangeSlot(props) {
    const user = useSelector(state => state.account.user);
    const [isLoading, setIsLoading] = useState(false);
    const [listSchedules, setListSchedules] = useState([]);
    const [listCourses, setListCourses] = useImmer([]);
    const [listSlots, setListSlots] = useState([]);
    const [dateChange, setDateChange] = useState();
    const [dayChange, setDayChange] = useState();
    const [slotChange, setSlotChange] = useState();

    useEffect(() => {
        fetchAllScheduleForTeacher();
        fetchAllCode();
    }, []);

    const fetchAllScheduleForTeacher = async () => {
        let res = await getAllScheduleForTeacher(`startDate=${moment().format('YYYY/MM/DD')}&teacherId=${user.id}`);
        if (res && res.dt) {
            setListSchedules(res.dt);
        }
    };

    const fetchAllCode = async () => {
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
                            date: item.date,
                            scheduleId: item.id,
                            slot: item.name,
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
        setIsLoading(true);
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
            await fetchAllScheduleForTeacher();
        } else {
            notification.error({
                message: "An error occurred",
                description: res.em,
                duration: 5
            });
        }
        setIsLoading(false);
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
                                                <Space direction="vertical">
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
                                                                    <Col>to</Col>
                                                                    <Col>
                                                                        <Row>
                                                                            <Col>
                                                                                <DatePicker disabledDate={d => !d || d.isBefore(moment().subtract(1, 'day'))} allowClear={false} onChange={onChange} format={dateFormatList} style={{ cursor: 'pointer' }} />
                                                                            </Col>
                                                                            <Col>
                                                                                <Select
                                                                                    placeholder="Select a slot"
                                                                                    style={{ width: 120 }}
                                                                                    onChange={handleChangeSlot}>
                                                                                    {
                                                                                        listSlots && listSlots.length > 0 &&
                                                                                        listSlots.map((item, index) => {
                                                                                            return (
                                                                                                <Select.Option key={index} value={item.code1} disabled={itemS.code === item.code1}>
                                                                                                    {item.description}
                                                                                                </Select.Option>
                                                                                            );
                                                                                        })
                                                                                    }

                                                                                </Select>
                                                                            </Col>
                                                                            <Col><Button type="primary" loading={isLoading} onClick={() => handleChangeSchedule(itemS.scheduleId)}>Change</Button></Col>
                                                                        </Row>
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