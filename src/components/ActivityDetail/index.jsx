import { Breadcrumb, Descriptions, Image, Table } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getClassById, getScheduleById, getUserById } from "../../services/api";
import moment from "moment";
import './ActivityDetail.scss';

function ActivityDetail(props) {
    const { activity, id } = useParams();
    const [scheduleDetail, setScheduleDetail] = useState({});
    const [userDetail, setUserDetail] = useState({});
    const [listStudents, setListStudents] = useState([]);

    useEffect(() => {
        fetchActivityDetail();
    }, [id]);

    const fetchActivityDetail = async () => {
        let res = activity === "Schedule"
            ? await getScheduleById(id)
            : activity === "User"
                ? await getUserById(id)
                : await getClassById(id);
        if (res && res.dt) {
            activity === "Schedule"
                ? setScheduleDetail(res.dt)
                : activity === "User"
                    ? setUserDetail(res.dt)
                    : setListStudents(res.dt);
        }
    };

    const items =
        activity === "Schedule" ?
            [
                {
                    key: '1',
                    label: 'Date',
                    children: moment(scheduleDetail?.date).format("dddd, MM/DD/YYYY")
                },
                {
                    key: '2',
                    label: 'Slot',
                    children: scheduleDetail?.code?.substring(1),
                },
                {
                    key: '3',
                    label: 'Student group',
                    children: <Link to={`/ActivityDetail/Class/${scheduleDetail?.group?.id}`}>{scheduleDetail?.group?.name}</Link>,
                },
                {
                    key: '4',
                    label: 'Instructor',
                    children: <Link to={`/ActivityDetail/User/${scheduleDetail?.teacher?.id}`}>{scheduleDetail?.teacher?.username}</Link>,
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
                    label: 'User name',
                    children: userDetail.username
                },
                {
                    key: '2',
                    label: 'Full name',
                    children: userDetail.fullName,
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
                    children: userDetail.email,
                }
            ];

    const columns = [
        {
            title: 'Index',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'IMAGE',
            dataIndex: 'image',
            key: 'image',
            render: () =>
                <Image
                    width={120}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />,
        },
        {
            title: 'USER NAME',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'FULL NAME',
            dataIndex: 'fullName',
            key: 'fullName',
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
                        title: activity === "Schedule" ? 'View' : activity === "User" ? 'User detail' : 'Class detail',
                    }
                ]}
            />
            <div className="activity-detail-content" style={{ margin: '15px 0' }}>
                <>
                    <div style={{ marginBottom: 40 }}>
                        <span style={{ fontSize: 30 }}>{activity === "Schedule" ? "Activity Detail" : activity === "User" ? 'User detail' : 'Class detail'}</span>
                    </div>
                    {activity === "Schedule"
                        ? <Descriptions column={1} size={'small'} bordered items={items} />
                        :
                        activity === "User"
                            ? <Descriptions column={1} size={'small'} bordered items={items} />
                            :
                            <Table size='small' columns={columns} dataSource={listStudents} pagination={false} />
                    }
                </>
            </div>
        </div>
    );
}

export default ActivityDetail;