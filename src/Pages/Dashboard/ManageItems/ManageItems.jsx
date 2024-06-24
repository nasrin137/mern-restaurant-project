// import { useEffect, useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { LiaEdit } from "react-icons/lia";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const ManageItems = () => {
    // const [menu, setMenu] = useState([]);
    // const[loading,setloading] = useState(true);
    const axiosSecure = UseAxiosSecure()
    const axiosPublic = useAxiosPublic();

    // useEffect(() => {
    //     // Fetch data from the backend
    //     const fetchData = async () => {
    //       try {
    //         const response = await fetch("http://localhost:6001/menu");
    //         const data = await response.json();
    //         setMenu(data);
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //       }
    //     };
    
    //     fetchData();
    //   }, []);


    const {data:menu = [],isPending:loading,refetch} = useQuery({
        queryKey:['menu'],
        queryFn:async()=>{
            const res = await axiosPublic.get('/menu')
            return res.data
        }
    })

    // handle delete item
    const handleDeleteItem =  (item) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`)
                // console.log(res.data)
                if(res.data.deletedCount > 0){
                    // refetch to update the ui
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title:`${item.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                      });

                }
          
            }
          });

    }


    return (
    <div className="section-container">
            {/* banner */}
        <div className='bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
            <div className="flex flex-col justify-center items-center gap-8">
                {/* texts */}
                <div className="px-4">
                    <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">Manage All Items</h2>
                </div>
            </div>
        </div>

        <div>
            <div className="overflow-x-auto mt-10">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>
         #
        </th>
        <th>Image</th>
        <th>Item Name</th>
        <th>Price</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {
        menu.map((item,index) => <tr key={item._id}>
            <td>
                {index + 1}
            </td>
             <td>
               <div className="flex items-center gap-3">
                 <div className="avatar">
                   <div className="mask mask-squircle w-12 h-12">
                     <img src={item.image}alt="Avatar Tailwind CSS Component" />
                   </div>
                 </div>
               
               </div>
             </td>
             <td>
                {item.name}
             
             </td>
             <td className="text-right">${item.price}</td>

             <td>
             <Link to={`/dashboard/updateItem/${item._id}`}>
             <button 
            className="btn bg-orange-500  btn-lg">
             <LiaEdit className="text-red-600"></LiaEdit>
           </button>
             
             </Link>
             </td>
             <td>
             <button onClick={()=>handleDeleteItem(item)}
               className="btn btn-ghost btn-lg">
                <IoMdTrash className="text-red-600"></IoMdTrash>
              </button>
             </td>
           </tr>
        )
      }
  
    </tbody>
   
    
  </table>
</div>
            </div>















    </div>
    );
};

export default ManageItems;