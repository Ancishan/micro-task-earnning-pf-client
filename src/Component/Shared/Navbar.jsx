import { Link } from "react-router-dom";
import useAuth from "../../hooks/UseAuth";
import logoimg from '../../assets/images.png';
import icon from '../../assets/placeholder.jpg';

const NavBar = () => {
    const { user, logOut } = useAuth();
    
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const navOptions = (
        <>
            {user ? (
                <>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <button onClick={handleLogOut} className="t">Logout</button>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-black text-white">
            <div className="navbar-start">
                <Link to="/">
                    <img className="w-52 rounded-lg" src={logoimg} alt="Website Logo" />
                </Link>
            </div>
            <div className="navbar-center">
                <div className="dropdown dropdown-end">
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-700 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
            </div>
            <div className="navbar-end">
                {user ? (
                    <div className="flex items-center space-x-2">
                        <span className="text-white">Coins: {user.coins}</span>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user.photoURL || icon} alt="User Avatar" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-slate-500 rounded-box w-52">
                                {navOptions}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <Link to="/">
                        <img className="w-12 rounded-full" src={icon} alt="Placeholder Icon" />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default NavBar;