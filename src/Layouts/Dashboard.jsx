import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";
import { MdBook, MdEditCalendar, MdEmail, MdHome, MdList, MdReviews, MdSearch, MdShoppingCart } from "react-icons/md";
import { FaUtensils } from "react-icons/fa";
import { LiaUsersSolid } from "react-icons/lia";
import useAdmin from "../Hooks/useAdmin";


const Dashboard = () => {
    const [cart] = useCart();
    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
            {
                isAdmin ?
                <>
                  <>
                    <li>
                       
                       <NavLink to = '/dashboard/adminHome'>
                       <MdHome></MdHome>
                           Admin Home</NavLink>
                       </li>
                <li>
                       
                       <NavLink to = '/dashboard/addItems'>
                       <FaUtensils />
                           Add Items</NavLink>
                       </li>
                    <li>
                       
                    <NavLink to = '/dashboard/manageItems'>
                    <MdList></MdList>
                    Manage Items</NavLink>
                    </li>
                    <li>
                       
                       <NavLink to = '/dashboard/bookings'>
                       <MdBook></MdBook>
                           Manage Bookings</NavLink>
                       </li>
                       <li>
                       
                       <NavLink to = '/dashboard/users'>
                       <LiaUsersSolid />

                         All Users</NavLink>
                       </li>
                    </>
                </>
                :
               <>
                <li>
                       
                       <NavLink to = '/dashboard/userHome'>
                       <MdHome></MdHome>
                           User Home</NavLink>
                       </li>
                    <li>
                       
                       <NavLink to = '/dashboard/history'>
                       <MdEditCalendar></MdEditCalendar>
                           Not History</NavLink>
                       </li>
                    <li>
                       
                    <NavLink to = '/dashboard/cart-page'>
                    <MdShoppingCart></MdShoppingCart>
                        My Cart ({cart.length})</NavLink>
                    </li>
                    <li>
                       
                       <NavLink to = '/dashboard/review'>
                       <MdReviews></MdReviews>
                           Reviews</NavLink>
                       </li>
                       <li>
                       
                       <NavLink to = '/dashboard/paymentHistory'>
                       <MdList></MdList>
                         Real  Payment History</NavLink>
                       </li>
               </>
            }
                    
                    
                
                       {/* shared navlinks */}
                       <div className="divider"></div>
                       <li>
                       
                       <NavLink to = '/'>
                       <MdHome></MdHome>
                            Home</NavLink>
                       </li>
                       <li>
                       
                       <NavLink to = '/menu'>
                       <MdSearch></MdSearch>
                            Menu</NavLink>
                       </li>
                       <li>
                       
                       <NavLink to = '/signup'>
                       <MdEmail></MdEmail>
                            Contact</NavLink>
                       </li>
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;