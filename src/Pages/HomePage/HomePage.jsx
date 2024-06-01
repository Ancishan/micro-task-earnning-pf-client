import HomeAnimation from "../../Component/HomeAnimation";
import useAuth from "../../hooks/UseAuth";
import Home from "../Home";



const HomePage = () => {
    const {user} = useAuth();
    return (
        <div>
            {
               user? <Home></Home> : <HomeAnimation></HomeAnimation>
            }
        </div>
    );
};

export default HomePage;