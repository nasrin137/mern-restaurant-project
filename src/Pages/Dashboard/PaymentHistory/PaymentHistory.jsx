import { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const PaymentHistory = () => {
    const {user} = useContext(AuthContext);

    const axiosSecure = UseAxiosSecure();

    const {data: payments = []} = useQuery({
        queryKey:['payments',user.email],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })
    return (
        <div className="section-container">
        {/* banner */}
           <div className='bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
        <div className="flex flex-col justify-center items-center gap-8">
            {/* texts */}
            <div className="px-4">
                <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">Payment History</h2>
            </div>
        </div>
        </div>

        <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Price</th>
        <th>Transaction Id</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {
        payments.map((payment,index) =>   <tr key={payment._id}>
            <th>{index + 1}</th>
            <td>${payment.price}</td>
            <td>{payment.transactionId}</td>
            <td>{payment.status}</td>
          </tr>)
      }
    
     
    </tbody>
  </table>
</div>












            
        </div>
    );
};

export default PaymentHistory;