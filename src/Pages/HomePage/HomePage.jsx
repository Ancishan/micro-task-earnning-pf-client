import HomeAnimation from "../../Component/HomeAnimation";
import YoutubeCom from "../../Component/Shared/YoutubeCom";
import useAuth from "../../hooks/UseAuth";
import Home from "../Home";



const HomePage = () => {
    const {user} = useAuth();
    return (
        <div>
            {
               user? <Home></Home> : <div><HomeAnimation></HomeAnimation><YoutubeCom></YoutubeCom></div>
            }
        </div>
    );
};

export default HomePage;