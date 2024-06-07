import { Helmet } from "react-helmet-async";
import Banner from "../Component/Banner";
import Reviews from "../Component/Reviews";


const Home = () => {
    return (
        <>
            <Helmet>
                <title>MTEPF || Home</title>
            </Helmet>
            <div>
                <Banner></Banner>
                <Reviews></Reviews>
            </div>
        </>

    );
};

export default Home;