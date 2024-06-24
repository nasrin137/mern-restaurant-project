import { useForm } from "react-hook-form";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const Signup = () => {
    const axiosPublic = useAxiosPublic()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm()
      const {createUser,updateUserProfile,login} = useContext(AuthContext);
        // redirecting to home page or specifig page
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    
      const onSubmit = (data) => {
        const name = data.name;
        const photoURL = data.photoURL;
        const email = data.email;
        const password = data.password;
        console.log(name,photoURL,email,password)
        createUser(email, password)
        .then((result) => {
          // Signed up 
          const loggedUser = result.user;
          console.log(loggedUser)
             //   alert("Account creation successfully done!")
        //   document.getElementById("my_modal_5").close()
        //   navigate(from, {replace: true})
          updateUserProfile(data.name,data.photoURL)
          .then(()=>{
            console.log('user profile updated');
              // create user entry in database
              const userInfo = {
                name:data.name,
                email:data.email
            }
            axiosPublic.post('/users',userInfo)
            .then(res =>{
                if(res.data.insertedId){
                    console.log('user added to the database')
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "user created successfully",
                        showConfirmButton: false,
                        timer: 1500
                      });
                     
                    document.getElementById("my_modal_5").close()
                    navigate(from, {replace: true})
                    // navigate('/')
                }
            })

          }).catch(error=>console.log(error))
     })
     .catch(error=>console.log(error))
      }

    return (
        <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
              <div className="modal-action mt-0 flex flex-col justify-center">
                    <form  onSubmit={handleSubmit(onSubmit)} className="card-body" method='dialog'>
                        <h3 className="font-bold text-lg">Create An Acoount</h3>
                          {/* name */}
                          <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="name" placeholder="Your Name" className="input input-bordered" 
                            {...register("name")} />
                             {errors.name && <span className="text-red-600">Name is required</span>}
                        </div>
                          {/* photo url */}
                          <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" placeholder="Photo URL" className="input input-bordered" 
                            {...register("photoURL")} />
                            {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                        </div>
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

                        {/* login btn */}
                        <div className="form-control mt-2">
                            <input type="submit" value='Signup' className="btn bg-green text-white"></input>
                        </div>
                        <p className="text-center my-1">
                            Have an account?{" "}
                            <button  className="underline text-red ml-1"
                             onClick={()=>document.getElementById('my_modal_5').showModal()}
                            >
                                Login
                            </button>{" "}
                        </p>

                        <Link to='/'
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>

                    </form>
                    {/* social login */}
                    <div className="text-center space-x-3">
                        <button className="btn btn-circle hover:bg-green hover:text-white">
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
                {/* modal */}
                <Modal></Modal>
        </div>
    );
};

export default Signup;