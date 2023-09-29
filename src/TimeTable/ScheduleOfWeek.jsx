import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

function ScheduleOfWeek(props) {
    return (
        <>
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
        </>
    );
}

export default ScheduleOfWeek;