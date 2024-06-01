import { Helmet } from "react-helmet-async";
import Banner from "../Component/Banner";


const Home = () => {
    return (
        <>
            <Helmet>
                <title>MTEPF || Home</title>
            </Helmet>
            <div>
                <Banner></Banner>
            </div>
        </>

    );
};

export default Home;