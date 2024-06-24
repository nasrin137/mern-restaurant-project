import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";


const useCart = () => {
    const {user}=useContext(AuthContext);
    const axiosSecure = UseAxiosSecure()

    const {data:cart=[],refetch} = useQuery({
        queryKey:['carts',user?.email],
        queryFn:async()=>{
            const res = await axiosSecure(`/carts?email=${user?.email}`)
            return res.data
            // fetch(`http://localhost:6001/carts?email=${user?.email}`)
            // return res.json()
        }
    })
    return [cart,refetch]
};

export default useCart;