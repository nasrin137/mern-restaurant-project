import axios from "axios";

const axioxPublic = axios.create({
    baseURL:'http://localhost:6001'
})
const useAxiosPublic = () => {
    return axioxPublic;
   
};

export default useAxiosPublic;