import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";

const axiosSecure = axios.create({
    baseURL:'http://localhost:6001'
})
const UseAxiosSecure = () => {
    const navigate = useNavigate();
    const{logOut}=useContext(AuthContext)

    // request interceptor to add authorization header for every secure call to the api

    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        console.log('request stopped by interceptors before adding token',token)
        config.headers.authorization = `Bearer ${token}`
        return config;
    },function (error){
        return Promise.reject(error)
    })

// interceptor 401 and 403 status
    axiosSecure.interceptors.response.use(function(response){
        return response;
    },async (error)=>{
        const status = error.response.status;
        // console.log('status error in the interceptor',status);
        // for 401 and 403 logout th euser and move the user to the login
        if(status === 401 || status ===403){
            await logOut()
            navigate('/signup ')
        }
        return Promise.reject(error)
    })
  return axiosSecure
};

export default UseAxiosSecure;