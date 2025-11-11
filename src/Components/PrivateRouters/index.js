import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../Utils/Cookie";
function PrivateRouters () {
    return (
        <>
            {isAuthenticated() ? <Outlet /> : <Navigate to="/signin" />}
        </>
    )
}
export default PrivateRouters;