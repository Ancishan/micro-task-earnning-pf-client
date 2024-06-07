import { Link, NavLink, Outlet } from 'react-router-dom';
import useRole from '../hooks/useRole';
import logoimg from '../assets/images.png';
import { FaHome } from 'react-icons/fa';
import useAdmin from './Admin/useAdmin';
import useAuth from '../hooks/UseAuth';
import { RiLogoutBoxFill } from 'react-icons/ri';

const Dashboard = () => {
  const { logOut } = useAuth()
  const [role] = useRole();
  const [isAdmin] = useAdmin();

  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(error => console.log(error));
  };

  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-slate-100">
        <img src={logoimg} alt="Logo" />
        <ul className="menu p-4">
          {role === 'TaskCreator' && (
            <>
              <li>
                <NavLink to="/dashboard/taskCreatorHome">Task Creator Home</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addtask">Add Task</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myTask">My Task</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reviewTask">Review Task</NavLink>
              </li>
            </>
          )}
          {role === 'Worker' && (
            <>
              <li>
                <NavLink to="/dashboard/workerHome">Worker Home</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/taskList">Task List</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/mySubmission">My Submission</NavLink>
              </li>
            </>
          )}
          {role === 'admin' && (
            <li>
              <NavLink to="/dashboard/adminHome">User List</NavLink>
            </li>
          )}
        </ul>
        <hr />
        <Link className='flex gap-3 items-center mt-4 ml-4' to='/'><FaHome className='text-xl' /> Home</Link>

        <button className='flex gap-3 items-center mt-4 ml-4' onClick={handleLogOut}><RiLogoutBoxFill  className='text-xl'/>Logout</button>
      </div>
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
