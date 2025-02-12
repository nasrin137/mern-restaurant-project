import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { IoMdTrash } from "react-icons/io";
import Swal from "sweetalert2";
import { LiaUsersSolid } from "react-icons/lia";


const AllUsers = () => {
    const axiosSecure = UseAxiosSecure()
    const {data: users = [],refetch} = useQuery({
        queryKey:['users'],
        queryFn:async()=>{
            const res = await axiosSecure.get('/users');

            return res.data
        }
    })
    // handle make admin
    const handleMakeAdmin = user =>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an admin now`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }

    // handle delete user
    const handleDeleteUser = user =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
            axiosSecure.delete(`/users/${user._id}`)
            .then(res =>{
                if(res.data.deletedCount > 0){
                    refetch()
                    Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                }
            })
            }
          });

    }
    return (
        <div>
             <div className="flex justify-evenly">
                <h2 className="text-3xl">All users</h2>
                <h2 className="text-3xl">Total users:{users.length}</h2>
            </div>
            <div className="overflow-x-auto">
  <table className="table table-zebra w-full">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        users.map((user,index)=> <tr key={user._id}>
            <th>{index + 1}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
           {
            user.role === 'admin'?
            "admin" :
            <button onClick={()=>handleMakeAdmin(user)}
            className="btn bg-orange-500  btn-lg">
             <LiaUsersSolid className="text-red-600" /> 
           </button>
           }
            </td>
            <td>
           <button onClick={()=>handleDeleteUser(user)}
              className="btn btn-ghost btn-lg">
               <IoMdTrash className="text-red-600"></IoMdTrash>
             </button>
           </td>
            
          </tr>)
        
      }
      
      
      
     
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AllUsers;