import { FaGithub, FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Modal = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const {signUpWithGmail,login} = useContext(AuthContext);
      const [errorMessage, setErrorMessage] = useState("");

       // redirecting to home page or specifig page
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const axiosPublic = useAxiosPublic()
    
      const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        console.log(email, password)
        login(email, password)
        .then((result) => {
            const user = result.user;
            console.log(user)
            alert("Login successfull");
            document.getElementById("my_modal_5").close()
            navigate(from, {replace: true})
            

          }).catch((error) => {
            const errorMessage = error.message;
            setErrorMessage("Provide a correct email and password!")
          })
      }

     

         // google signin
    const handleLogin = () => {
        signUpWithGmail()
        .then((result) => {
          const user = result.user;
          console.log(user)
          const userInfo={
            email:result.user?.email,
            name:result.user?.displayName
        }
        axiosPublic.post('/users',userInfo)
        .then(res=>{
            console.log(res.data)
            alert("Login successfull!")
            navigate('/')
        })
        
        
        }).catch((error) => 
            console.log(error))
      }
    return (
        <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
            <div className="modal-box">

                <div className="modal-action mt-0 flex flex-col justify-center">
                    <form  onSubmit={handleSubmit(onSubmit)} className="card-body" method='dialog'>
                        <h3 className="font-bold text-lg">Please Login</h3>
                        {/* email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" 
                            {...register("email")} />
                        </div>
                        {/* password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" 
                            {...register("password")}/>
                            <label className="label mt-1">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        {/* error */}
                        {
              errorMessage ? <p className="text-red-600 text-xs italic">{errorMessage}</p> : ""
            }

                        {/* login btn */}
                        <div className="form-control mt-2">
                            <input type="submit" value='Login' className="btn bg-green text-white"></input>
                        </div>
                        <p className="text-center my-1">
                            Donot have an account?{" "}
                            <Link to="/signup" className="underline text-red ml-1">
                                Signup Now
                            </Link>{" "}
                        </p>

                        <button
                        htmlFor='my_modal_5'
                        onClick={()=>document.getElementById('my_modal_5').close()}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                    </form>
                    {/* social login */}
                    <div className="text-center space-x-3">
                        <button onClick={handleLogin} className="btn btn-circle hover:bg-green hover:text-white">
                            <FaGoogle></FaGoogle>
                        </button>
                        <button className="btn btn-circle hover:bg-green hover:text-white">
                            <FaFacebook></FaFacebook>
                        </button>
                        <button className="btn btn-circle hover:bg-green hover:text-white">
                            <FaGithub></FaGithub>
                        </button>
                    </div>

                </div>
            </div>
        </dialog>
    );
};

export default Modal;