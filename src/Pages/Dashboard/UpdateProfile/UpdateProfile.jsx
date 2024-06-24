import { useContext } from "react";
import { useForm } from "react-hook-form"
import { AuthContext } from "../../../Contexts/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const { updateUserProfile} = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

            // redirecting to home page or specifig page
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    
      const onSubmit = (data) => {
        const name = data.name;
        const photoURL = data.photoURL;
        console.log(name,photoURL);
        updateUserProfile(name,photoURL)
        .then(()=>{
            navigate(from, {replace: true})

        })
        .catch((error)=>{

        })
      }

    return (
        <div className="flex items-center justify-center h-screen">
              <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <h3 className="font-bold">Update Your Profile</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" {...register("name")} placeholder="Your Name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upload Photo</span>
          </label>
          <input type="text" {...register("photoURL")} placeholder="photoURL" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn  bg-green text-white">Update</button>
        </div>
      </form>
    </div>
        </div>
    );
};

export default UpdateProfile;