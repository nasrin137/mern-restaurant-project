import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { data } from "autoprefixer";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import useCart from "../../../Hooks/useCart";

const Cards = ({ item }) => {
    const{name,image,_id,recipe,price}=item

    const{user}=useContext(AuthContext);
    const navigate = useNavigate()
    const location = useLocation()
    const axiosSecure = UseAxiosSecure()
    const[cart,refetch] = useCart()

    const[isHeartFilted,setIsHeartFilted] = useState(false);

    // handle add to cart
    const handleAddToCart=(item)=>{
        // console.log('clivked',item)
        if(user && user?.email){
            const cartItem = {
                menuItemId:_id,
                name,
                price,
                quantity:1,
                image,
                email:user?.email
            }
            // trying axios--------------
            axiosSecure.post('/carts',cartItem)
            .then(res =>{
                console.log(res.data);
                if(res.data.insertedId){
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${name}added to your cart`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                        //   refetch cart to update the cart items count
                //   refetch()

                }
            })
        }else{
            Swal.fire({
                title: "you are not logged in",
                text: "pls signup to add to cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, signup!"
              }).then((result) => {
                if (result.isConfirmed) {
                // send user to the login page
                navigate('/signup',{state:{from:location}})
                }
                

              });
        }












    //         fetch('http://localhost:6001/carts',{
    //             method:"POST",
    //             headers:{
    //                 'content-type':'application/json'
    //             },
    //             body:JSON.stringify(cartItem)
    //         })
    //         .then(res=>res.json())
    //         .then(data =>{
    //             // console.log(data)
    //             if(data.insertedId){
    //                 Swal.fire({
    //                     position: "top-end",
    //                     icon: "success",
    //                     title:`${name} added to your cart`,
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                   });
    //             }
    //         })
    //     }else{
    //         Swal.fire({
    //             title: "Please Login!",
    //             text: "without an account you cannot add an item",
    //             icon: "warning",
    //             showCancelButton: true,
    //             confirmButtonColor: "#3085d6",
    //             cancelButtonColor: "#d33",
    //             confirmButtonText: "Signup Now!"
    //           }).then((result) => {
    //             if (result.isConfirmed) {
    //                 navigate('/signup',{state:{from:location}})
                 
    //             }
    //           });
    //     }

     }

    const handleHeartClick = () =>{
        setIsHeartFilted(!isHeartFilted)
    }

    return (
        
            <div className="card w-96 bg-base-100 shadow-xl relative">
                <div className={`rating gap-1 absolute right-2 top-0 p-4 heartStar bg-green ${isHeartFilted?'text-rose-500':'text-white'}`}
                onClick={handleHeartClick}
                >
                    <FaHeart className="h-5 w-5 cursor-pointer"></FaHeart>
                </div>
               <Link to={`/menu/${item._id}`}> <figure><img src={item.image} alt="Shoes" className="hover:scale-105 transition-all duration-200 md:h-64 p-7" /></figure></Link>
                <div className="card-body">
                  <Link to={`/menu/${item._id}`}><h2 className="card-title">{item.name}</h2></Link>
                    <p>{item.recipe}</p>
                    <div className="card-actions justify-between items-center mt-2">
                        <h5 className="font-semibold"><span className="text-sm text-red">$</span>{item.price}</h5>
                        <button onClick={()=>handleAddToCart(item)}
                         className="btn bg-green text-white">Add To Cart</button>
                    </div>
                </div>
            </div>
       
    );
};

export default Cards;