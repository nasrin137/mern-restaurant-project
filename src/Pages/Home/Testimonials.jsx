import testimonialsImg from '../../assets/images/testimonials (1).png'
import img1 from '../../assets/images/testimonials (1).png'
import img2 from '../../assets/images/testimonial2.png'
import img3 from '../../assets/images/testimonial3.png'
const Testimonials = () => {
    return (
        <div className="section-container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="md:w-1/2">
                    <img src={testimonialsImg} alt="" />
                </div>
                <div className="md:w-1/2">
                    <div className='text-left md:w-4/5'>
                        <h1 className="title">What our customer say about us</h1>
                        <blockquote className='my-5 leading-[30px]'>
                            Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                        </blockquote>

                        {/* avatar */}
                        <div>
                            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                                <div className="avatar">
                                    <div className="w-12">
                                        <img src={img1} />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-12">
                                        <img src={img2} />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-12">
                                        <img src={img3} />
                                    </div>
                                </div>
                                <div className="avatar placeholder">
                                    <div className="w-12 bg-neutral text-neutral-content">
                                        <span>+99</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Testimonials;