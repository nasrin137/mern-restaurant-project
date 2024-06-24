import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";


const AdminRoute = ({children}) => {
    const{user,loading} = useContext(AuthContext)
    const [isAdmin,isAdminLoading] = useAdmin()
    const location = useLocation();

    if(loading || isAdminLoading){
        return <progress className="progress w-56"></progress>
    }
    if(user && isAdmin){
        return children;
    }

    return <Navigate to='/signup' state={{from:location}} replace></Navigate>
};

export default AdminRoute;