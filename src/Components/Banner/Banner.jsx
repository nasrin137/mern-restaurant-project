import bannerImg from '../../assets/images/banner.png'

const Banner = () => {
    return (
        <div className='section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
            <div className="py-24 flex flex-col md:flex-row justify-between items-center gap-8">
                {/* texts */}
                <div className="md:w-1/2 space-y-7 px-4">
                    <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">Welcome to [Restaurant Name]: Where Taste Meets Elegance</h2>
                    <p className="text-xl text-[#4A4A4A]">At [Restaurant Name], we take pride in offering a unique blend of traditional and contemporary cuisine, prepared with passion and precision.</p>
                    <button className="btn bg-green px-8 py-3 font-semibold text-white rounded-full">Order Now</button>
                </div>
                {/* image */}
                <div className="md:w-1/2">
                    <img src={bannerImg} alt="" />
                </div>
            </div>
            
        </div>
    );
};

export default Banner;
