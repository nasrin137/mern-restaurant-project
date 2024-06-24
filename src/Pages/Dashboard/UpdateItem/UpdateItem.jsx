import { useForm } from "react-hook-form";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

import { useLoaderData } from "react-router-dom";



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateItem = () => {
    const {name,category,recipe,price,_id} = useLoaderData();
    console.log(name,category,recipe,price,_id)
    
    
    

    const axiosPublic = useAxiosPublic()
    const axiosSecure = UseAxiosSecure()

    const {
        register,
        handleSubmit,
        reset,
      } = useForm()

      const onSubmit = async(data) => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = {image:data.image[0]}
        const res = await axiosPublic.post(image_hosting_api,imageFile,{
            headers:{
                'content-type':'multipart/form-data'
            }
        });
        if(res.data.success){
            // now send the menu item data to the server with the image
            const menuItem = {
                name:data.name,
                category:data.category,
                price:parseFloat(data.price),
                recipe:data.recipe,
                image:res.data.data.display_url
            }
            // 
            const menuRes = await axiosSecure.patch(`/menu/${_id}`,menuItem)
            console.log(menuRes.data)
            if(menuRes.data.modifiedCount>0){
                reset()
                // show success popup
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title:`${data.name} is updated to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        console.log(res.data)
      }

      
    
    return (
    <div className="section-container">
        {/* banner */}
    <div className='bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
        <div className="flex flex-col justify-center items-center gap-8">
            {/* texts */}
            <div className="px-4">
                <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">Update An Item</h2>
            </div>
        </div>
    </div>

       {/* update items form */}

       <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                   
                  <div>
                  <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Recipe name*</span>
                            
                        </div>
                        <input 
                        type="text" 
                        placeholder="recipe name" 
                        defaultValue={name}
                        {...register("name",{required:true})}

                        className="input input-bordered w-full " />
                       
                    </label>
                  </div>
                  <div className="flex gap-6">
                  <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Category*</span>
                            
                        </div>
                        <select defaultValue={category} {...register("category",{required:true})}
                        className="select select-bordered w-full">
                        <option disabled value='default'>Select a category</option>
                        <option value="salad">salad</option>
                        <option value="pizza">pizza</option>
                        <option value="soup">soup</option>
                        <option value="dessert">dessert</option>
                        <option value="drinks">drinks</option>

                    </select>
                       
                    </label>

                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Price*</span>
                            
                        </div>
                        <input 
                        type="number" 
                        placeholder="price" 
                        defaultValue={price}
                        {...register("price",{required:true})}

                        className="input input-bordered w-full " />
                       
                    </label>
                  </div>
                  <label className="form-control">
  <div className="label">
    <span className="label-text">Recipe Details</span>
   
  </div>
  <textarea defaultValue={recipe}
     {...register("recipe")}
  className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
  
</label>
<div className="form-control w-full my-6">
<input
   {...register("image",{required:true})}
type="file" className="file-input w-full max-w-xs" />
</div>
                   
                    <button className="btn">Update Item </button>
                </form>
            </div>














            
        </div>
    );
};

export default UpdateItem;