import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import useRole from '../hooks/useRole';
import logoimg from '../assets/images.png';
import { FaHome } from 'react-icons/fa';
import useAuth from '../hooks/UseAuth';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { Helmet } from 'react-helmet-async';


const Dashboard = () => {
  const { logOut } = useAuth()
  const [role] = useRole();
  const navigate = useNavigate();

  const handleLogOut = (event) => {
    event.preventDefault(); 
    logOut()
      .then(() => { 
        navigate('/login');
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <Helmet>
        <title>MTEPF || Dashboard</title>
      </Helmet>
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
                <li>
                  <NavLink to="/dashboard/approveList">Approval List</NavLink>
                </li>
                <li>
                  <NavLink to='/dashboard/workerProfile'>WorkerProfile</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/pay">Pay List</NavLink>
                </li>
                {/* <li>
                  <NavLink to="/dashboard/prog">Get Work</NavLink>
                </li> */}

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
                {/* <li>
                  <NavLink to="/dashboard/work">CompleteTask</NavLink>
                </li> */}
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
          <button className='flex gap-3 items-center mt-4 ml-4' onClick={handleLogOut}><RiLogoutBoxFill className='text-xl' />Logout</button>

          {/* <a className='flex gap-3 items-center mt-4 ml-4' onClick={handleLogOut} href="/login"><RiLogoutBoxFill className='text-xl' />Logout</a> */}
        </div>
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
