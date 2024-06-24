import { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const AdminHome = () => {
    const {user} = useContext(AuthContext);

    const axiosSecure = UseAxiosSecure();

    const {data: stats} = useQuery({
        queryKey:['admin-stats'],
        queryFn:async()=>{
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    })

    return (
        <div>
             <h2 className="text-3xl">
                <span>Hi,Welcome </span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }
            </h2>

            <div className="stats shadow mt-10 gap-5 flex mr-1">
  
  <div className="stat ">
    <div className="stat-figure text-secondary">
     
    </div>
    <div className="stat-title font-bold text-3xl mb-3">Revenues</div>
    <div className="stat-value">${stats?.revenue}</div>
    <div className="stat-desc">Jan 1st - Feb 1st</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
    
    </div>
    <div className="stat-title font-bold text-3xl mb-3"> Users</div>
    <div className="stat-value">{stats?.users}</div>
    <div className="stat-desc">↗︎ 400 (22%)</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
    
    </div>
    <div className="stat-title font-bold text-3xl mb-3">Orders</div>
    <div className="stat-value">{stats?.orders}</div>
    <div className="stat-desc">↘︎ 90 (14%)</div>
  </div>

  <div className="stat">
    <div className="stat-figure text-secondary">
    
    </div>
    <div className="stat-title font-bold text-3xl mb-3">Menu Items</div>
    <div className="stat-value">{stats?.menuItems}</div>
    <div className="stat-desc">↘︎ 90 (14%)</div>
  </div>
  
            </div>
    
        </div>
    );
};

export default AdminHome;