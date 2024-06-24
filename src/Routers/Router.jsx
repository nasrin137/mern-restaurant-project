import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu";
import Signup from "../Components/Signup/Signup";
import PrivateRouter from "./PrivateRouter";
import UpdateProfile from "../Pages/Dashboard/UpdateProfile/UpdateProfile";
import CartPage from "../Pages/Menu/CartPage";
import Dashboard from "../Layouts/Dashboard";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/menu',
            element:<PrivateRouter><Menu></Menu></PrivateRouter>
        },
        // {
        //   path:'/cart-page',
        //   element:<CartPage></CartPage>
        // },
        {
          path:'/update-profile',
          element:<UpdateProfile></UpdateProfile>
        }
      ]
    },
    {
        path:'/signup',
        element:<Signup></Signup>
    },
    {
      path:'dashboard',
      element:<PrivateRouter><Dashboard></Dashboard></PrivateRouter>,
      children:[
        // normal users routes
        {
          path:'userHome',
          element:<UserHome></UserHome>
        },
        {
          path:'cart-page',
          element:<CartPage></CartPage>
        },
        {
          path:'payment',
          element:<Payment></Payment>
        },
        {
          path:'paymentHistory',
          element:<PaymentHistory></PaymentHistory>
        },
        // admin routes
        {
          path:'adminHome',
          element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path:'addItems',
          element:<AdminRoute><AddItems></AddItems></AdminRoute>
        },
        {
          path:'manageItems',
          element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
        },
        {
          path:'updateItem/:id',
          element:<AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
          loader:({params})=>fetch(`http://localhost:6001/menu/${params.id}`)
        },
        {
          path:'users',
          element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
        }
      ]
    }
  ]);
  export default router;