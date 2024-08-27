import { Outlet } from "react-router-dom";
import Navbar from "../Component/Shared/Navbar";
import Footer from "../Component/Shared/Footer";



const Main = () => {
    return (
        <div>
            {/* <Navbar></Navbar> */}
           <Outlet></Outlet>
           <Footer></Footer>
        </div>
    );
};

export default Main;