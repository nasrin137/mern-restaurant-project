const categoryItems = [
    {
      "id": 1,
      "title": "Gourmet Burgers",
      "description": "Savor our handcrafted burgers, made with premium ingredients and unique flavors.",
      "image": "/assets/images/img1.png"
    },
    {
      "id": 2,
      "title": "Fresh Seafood",
      "description": "Dive into our selection of fresh, sustainably sourced seafood dishes.",
      "image": "/assets/images/img1.png"
    },
    {
      "id": 3,
      "title": "Vegan Delights",
      "description": "Enjoy our vibrant and delicious plant-based creations, made to satisfy every palate.",
      "image": "/assets/images/img1.png"
    },
    {
      "id": 4,
      "title": "Classic Pastas",
      "description": "Relish our authentic pasta dishes, crafted with traditional recipes and fresh ingredients.",
      'image': '/assets/images/img1.png'
    }
  ]
  

const Categories = () => {
    return (
        <div className="section-container py-16">
           <div>
                <h1 className="title">Popular Categories</h1>
           </div>
           {/* category cards */}
           <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-around items-center mt-12">
                {
                    categoryItems.map((item,index)=>(
                        <div key={index} className="shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all">
                            <div className="flex w-full mx-auto items-center justify-center">
                                <img src={item.image} alt="" className="bg-[#C1F1C6] p-5 rounded-full w-28 h-28" />
                            </div>
                            <div className="mt-5 space-y-1">
                                <h5>{item.title}</h5>
                                <p>{item.description}</p>
                            </div>

                        </div>

                    )
               ) }
           </div>
        </div>
    );
};

export default Categories;