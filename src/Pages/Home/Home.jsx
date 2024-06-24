import Banner from "../../Components/Banner/Banner";
import Categories from "./Categories";
import Services from "./Services";
import SpecialDishes from "./SpecialDishes";
import Testimonials from "./Testimonials";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <SpecialDishes></SpecialDishes>
            <Testimonials></Testimonials>
            <Services></Services>
        </div>
    );
};

export default Home;