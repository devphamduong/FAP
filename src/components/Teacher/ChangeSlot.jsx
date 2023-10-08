import { Breadcrumb, Button, Collapse, Descriptions, Space } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllScheduleForTeacher } from "../../services/api";
import { useImmer } from "use-immer";
import moment from "moment";

function ChangeSlot(props) {
    const [listSchedules, setListSchedules] = useState([]);
    const [listCourses, setListCourses] = useImmer([]);

    useEffect(() => {
        fetchAllScheduleForTeacher();
    }, []);

    const fetchAllScheduleForTeacher = async () => {
        //FIX WHEN YOUR DONE
        let res = await getAllScheduleForTeacher('startDate=abc&teacherId=2');
        if (res && res.dt) {
            setListSchedules(res.dt);

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
                                    code: item.code
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
                                code: item.code
                            }
                        ];
                    });
                }
            });
        }
    }, [listSchedules]);

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
                                                                <>
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
                                                                </>
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