import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import '../App.css'
import Footer from "../Shared/Footer/Footer";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";

const Root = () => {
    const{loading}=useContext(AuthContext)
    return (
      <div>
        {
            loading ? <LoadingSpinner></LoadingSpinner>:
            <div>
            <Navbar></Navbar>
          <div className="min-h-screen">
          <Outlet></Outlet>
          </div>
            <Footer></Footer>
        </div>
        }
      </div>
    );
};

export default Root;