import { Breadcrumb, Button, Collapse, Space } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllScheduleForTeacher } from "../../services/api";
import { useImmer } from "use-immer";

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

        const subjectSet = new Set();
        if (listSchedules.length > 0) {
            listSchedules.map((item, index) => {
                if (!subjectSet.has(item.day.subject.name)) {
                    subjectSet.add(item.day.subject.name);
                    setListCourses(draft => {
                        draft[index] = {
                            subject: item.day.subject.name,
                            date: item.date,
                            scheduleId: item.id,
                            slot: item.name
                        };
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
                <Space direction="vertical">
                    {listCourses && listCourses.length > 0 &&
                        listCourses.map((item, index) => {
                            return (
                                <Collapse key={`course-${item.subject}`}
                                    items={[{ key: index, label: <>{item.subject}</>, children: <p>{item.date} - {item.slot}</p> }]}
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