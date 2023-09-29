import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

function TimeTable(props) {
    return (
        <>
            <Breadcrumb
                items={[
                    {
                        title: <Link to={'/'}>Home</Link>,
                    },
                    {
                        title: 'TimeTable',
                    }
                ]}
            />
        </>
    );
}

export default TimeTable;