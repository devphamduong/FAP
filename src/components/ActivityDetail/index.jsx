import { Breadcrumb, Descriptions, Image } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getScheduleById } from "../../services/api";
import moment from "moment";
import './ActivityDetail.scss';

function ActivityDetail(props) {
    const { activity, id } = useParams();
    const [scheduleDetail, setScheduleDetail] = useState({});

    useEffect(() => {
        fetchScheduleDetail();
    }, [id]);

    const fetchScheduleDetail = async () => {
        let res = await getScheduleById(id);
        if (res && res.dt) {
            setScheduleDetail(res.dt);
        }
    };

    const items =
        activity === "Schedule" ?
            [
                {
                    key: '1',
                    label: 'Date',
                    children: moment(scheduleDetail?.date).format("dddd, MM/DD/YYYY"),
                    span: 1
                },
                {
                    key: '2',
                    label: 'Slot',
                    children: scheduleDetail?.code?.substring(1),
                },
                {
                    key: '3',
                    label: 'Student group',
                    children: scheduleDetail?.group?.name,
                },
                {
                    key: '4',
                    label: 'Instructor',
                    children: <Link to={`/ActivityDetail/User/${scheduleDetail?.teacher?.id}`}>{scheduleDetail?.teacher?.code}</Link>,
                },
                {
                    key: '5',
                    label: 'Course',
                    children: scheduleDetail?.course,
                },
                {
                    key: '6',
                    label: 'Course session number',
                    children: '',
                },
                {
                    key: '7',
                    label: 'Course session type',
                    children: '',
                },
                {
                    key: '8',
                    label: 'Course session description',
                    children: '',
                },
                {
                    key: '9',
                    label: 'Campus/Programme',
                    children: 'FU-HL',
                },
                {
                    key: '10',
                    label: 'Attendance',
                    children: 'Not yet',
                },
                {
                    key: '11',
                    label: 'Record time',
                    children: '	8/3/2023 12:21:00 PM',
                },
            ]
            :
            activity === "User" &&
            [
                {
                    key: '1',
                    label: 'Code',
                    children: 'TienTD17',
                    span: 1
                },
                {
                    key: '2',
                    label: 'Full name',
                    children: 'Tạ Đình Tiến',
                },
                {
                    key: '3',
                    label: 'Image',
                    children:
                        <Image
                            width={200}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />,
                },
                {
                    key: '4',
                    label: 'Email',
                    children: 'email',
                }
            ];

    return (
        <div className="activity-detail-container">
            <Breadcrumb
                items={[
                    {
                        title: <Link to={'/'}>Home</Link>,
                    },
                    {
                        title: activity === "Schedule" ? 'View' : 'User detail',
                    }
                ]}
            />
            <div className="activity-detail-content" style={{ margin: '15px 0' }}>
                <>
                    <div style={{ marginBottom: 40 }}>
                        <span style={{ fontSize: 30 }}>{activity === "Schedule" ? "Activity Detail" : "User detail"}</span>
                    </div>
                    {activity === "Schedule"
                        ? <Descriptions column={1} size={'small'} bordered items={items} />
                        :
                        activity === "User" &&
                        <Descriptions column={1} size={'small'} bordered items={items} />
                    }
                </>
            </div>
        </div>
    );
}

export default ActivityDetail;