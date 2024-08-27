import { Helmet } from "react-helmet-async";
import Banner from "../Component/Banner";
import Reviews from "../Component/Reviews";
import NavBar from "../Component/Shared/Navbar";
import Footer from "../Component/Shared/Footer";


const Home = () => {
    return (
        <>
            <Helmet>
                <title>MTEPF || Home</title>
            </Helmet>
            <div>
                <NavBar></NavBar>
                <Banner></Banner>
                <Reviews></Reviews>
                {/* <Footer></Footer> */}
            </div>
        </>

    );
};

export default Home;