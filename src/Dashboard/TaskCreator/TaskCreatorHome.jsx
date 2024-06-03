import { Link } from "react-router-dom";
import useAuth from "../../hooks/UseAuth";
import useRole from "../../hooks/useRole";
import { IoNotifications } from "react-icons/io5";

const TaskCreatorHome = () => {
    const { user } = useAuth();
    const [role] = useRole();
    return (
        <div>
            <div className="flex justify-end gap-8 items-center">

                <div>
                    <h3>Available Coin: </h3>
                    <h2>User Role:{role} </h2>
                </div>
                <div>
                    <img className="w-12 h-12 rounded-full" src={user?.photoURL} alt="" />
                    <h2>{user?.displayName}</h2>
                </div>
                <div className="text-3xl">
                    <Link to=''> <IoNotifications /></Link>
                </div>
            </div>
            {/*  */}
        </div>
    );
};

export default TaskCreatorHome;