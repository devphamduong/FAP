import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermitted from "./NotPermitted";

function RoleBaseRoute(props) {
    const isTeacherRoute = window.location.pathname.startsWith('/Teacher');
    const user = useSelector(state => state.account.user);
    const userRole = user.role;

    return (
        <>
            {isTeacherRoute && userRole === 'Teacher'
                ? <>{props.children}</>
                : <NotPermitted />
            }
        </>
    );
}

function ProtectedRoute(props) {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);

    return (
        <>
            {isAuthenticated
                ? <RoleBaseRoute>{props.children}</RoleBaseRoute>
                : <Navigate to={'/Login'} replace />
            }
        </>
    );
}

export default ProtectedRoute;