const servicesList =
[
    {
      "id": 201,
      "title": "Catering Services",
      "description": "Exceptional catering for all your special events and celebrations.",
      "image": "catering_services.jpg"
    },
    {
      "id": 202,
      "title": "Private Dining",
      "description": "Exclusive private dining experiences tailored to your needs.",
      "image": "private_dining.jpg"
    },
    {
      "id": 203,
      "title": "Online Reservations",
      "description": "Convenient online booking to reserve your table in advance.",
      "image": "online_reservations.jpg"
    },
    {
      "id": 204,
      "title": "Delivery Service",
      "description": "Enjoy our delicious food delivered straight to your door.",
      "image": "delivery_service.jpg"
    }
  ]
  

const Services = () => {
    return (
        <div className="section-container my-16">
                 <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              {/* texts */}
              <div className="md:w-1/2">
                    <div className='text-left md:w-4/5'>
                        <h1 className="title"> our services</h1>
                        <p className='my-5 leading-[30px]'>
                            Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                        </p>
                        <button className="btn bg-green text-white px-8 py-3 rounded-full">Explore</button>

                      

                    </div>
                </div>

                    {/* images */}
                <div className="md:w-1/2">
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
                        {
                            servicesList.map(service=>(
                                <div key={service.id} className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-green cursor-pointer hover:border-indigo-600 transition-all duration-200 hover:border">
                                    <img src={service.image} alt="" className="mx-auto" />
                                    <h5 className="pt-3 font-semibold">{service.title}</h5>
                                    <p className="text-[#90BD95]">{service.description}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>

              
            </div>

            
        </div>
    );
};

export default Services;