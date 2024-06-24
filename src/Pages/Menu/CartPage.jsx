import { FaTrash } from "react-icons/fa";
import useCart from "../../Hooks/useCart";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { Link } from "react-router-dom";


const CartPage = () => {
    const[cart,refetch] = useCart();
    const{user} = useContext(AuthContext);
    const[cartItems,setCartItems]=useState([])
    const axiosSecure = UseAxiosSecure()

    // calculate price
    const calculatePrice = (item)=>{
        return item.price * item.quantity
    }

    const handleDecrease= (item)=>{
        // console.log(item._id)
       if(item.quantity > 1){
        fetch(`http://localhost:6001/carts/${item._id}`,{
            method:'PUT',
            headers:{
                'Content-type':'application/json; charset=UTF-8'
            },
            body:JSON.stringify({quantity:item.quantity - 1})
        })
        .then(res=>res.json())
        .then(data=>{
            const updatedCart = cartItems.map((cartItem)=>{
                if(cartItem.id === item.id){
                    return{
                        ...cartItem,
                        quantity:cartItem.quantity - 1
                    }
                }
                return cartItem
            })
            refetch()
            setCartItems(updatedCart)
        })
        refetch()
       }else{
        alert('item cannot be zero')
       }

    }
    // calculate total price
    const cartSubTotal = cart.reduce((total,item)=>{
        return total + calculatePrice(item)

    },0)
    const orderTotal = cartSubTotal

    // handle increase
    const handleIncrease=(item)=>{
        // console.log(item._id)
        fetch(`http://localhost:6001/carts/${item._id}`,{
            method:'PUT',
            headers:{
                'Content-type':'application/json; charset=UTF-8'
            },
            body:JSON.stringify({quantity:item.quantity + 1})
        })
        .then(res=>res.json())
        .then(data=>{
            const updatedCart = cartItems.map((cartItem)=>{
                if(cartItem.id === item.id){
                    return{
                        ...cartItem,
                        quantity:cartItem.quantity + 1
                    }
                }
                return cartItem
            })
            refetch()
            setCartItems(updatedCart)
        })
        refetch()

    }

    // handle delete
    const handleDelete = (item) =>{
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
              axiosSecure.delete(`/carts/${item._id}`)
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
        <div className="section-container">
            {/* banner */}
               <div className='bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
            <div className="flex flex-col justify-center items-center gap-8">
                {/* texts */}
                <div className="px-4">
                    <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">Items Added To The Cart</h2>
                </div>
              
            </div>
            
        </div>

        {/* table */}
        <div className="overflow-x-auto">
  <table className="table mt-10">
    {/* head */}
    <thead className="bg-green text-white rounded-sm">
      <tr>
         <th>#</th>
        <th>Food</th>
        <th>Item Name</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
   {
    cart.map((item,index)=>(
        <tr key={index}>
        <td>{index + 1}</td>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={item.image} alt="" />
              </div>
            </div>
          
          </div>
        </td>
        <td className="font-medium">
          {item.name}
        </td>
        <button onClick={()=>handleDecrease(item)}
         className="btn btn-xs ">-</button>

        <input onChange={()=>console.log(item.quantity)}
        type="number" value={item.quantity} className="w-10 mx-2 text-center overflow-hidden appearance-none" />

        <button onClick={()=>handleIncrease(item)}
         className="btn btn-xs">+</button>

        <td>${calculatePrice(item).toFixed(2)}</td>

        <th>
          <button onClick={()=>handleDelete(item)}
           className="btn btn-ghost text-red-700 btn-xs">
            <FaTrash></FaTrash>
          </button>
        </th>
      </tr>
    ))
   }
      
    </tbody>
   
  </table>
</div>

            {/* customer details */}
            <div className="my-12 flex flex-col md:flex-row justify-between items-start">
                <div className="max-w-1/2 space-y-3">
                    <h3 className="font-medium">Customer Details</h3>
                    <p>Name:{user?.displayName}</p>
                    <p>Email:{user?.email}</p>
                    <p>User_id:{user?.uid}</p>
                </div>
                <div className="max-w-1/2 space-y-3">
                <h3 className="font-medium">Shopping Details</h3>
                <p>Total Item:{cart.length}</p>
                <p>Total Price:${orderTotal.toFixed(2)}</p>
             {
                cart.length ?
                <Link to='/dashboard/payment'>
                <button
                  className="btn bg-green text-white">Procceed Checkout</button>
                </Link>:
                 <button disabled
                 className="btn bg-green text-white">Procceed Checkout</button>

             }
                </div>
            </div>
        </div>
    );
};

export default CartPage;