import { Breadcrumb } from "antd";
import { Link, useLocation, useParams } from "react-router-dom";

function ActivityDetail(props) {
    const { activity, id } = useParams();

    return (
        <div className="activity-detail-container">
            <Breadcrumb
                items={[
                    {
                        title: <Link to={'/'}>Home</Link>,
                    },
                    {
                        title: 'View',
                    }
                ]}
            />
            <div className="activity-detail-content" style={{ margin: '15px 0' }}>
                {activity === "Schedule" &&
                    <div>
                        <span style={{ fontSize: 30 }}>Activity detail</span>
                        <Link to={`/ActivityDetail/User/1`}>User</Link>
                    </div>
                }
                {activity === "User" &&
                    <div>
                        <span style={{ fontSize: 30 }}>User detail</span>
                        <Link to={`/ActivityDetail/Schedule/1`}>Schedule</Link>
                    </div>
                }
            </div>
        </div>
    );
}

export default ActivityDetail;