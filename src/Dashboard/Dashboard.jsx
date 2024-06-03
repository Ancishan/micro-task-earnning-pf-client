// Dashboard.js
import { NavLink, Outlet } from 'react-router-dom';
import useRole from '../hooks/useRole';
// import useAuth from '../../hooks/UseAuth';


const Dashboard = () => {
  const [role] = useRole();

  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu p-4">
          {role === 'TaskCreator' && (
            <>
              <li>
                <NavLink to="/dashboard/taskCreatorHome">Task Creator Home</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItems">Add Items</NavLink>
              </li>
            </>
          )}
          {role === 'Worker' && (
            <li>
              <NavLink to="/dashboard/userHome">User Home</NavLink>
            </li>
          )}
        </ul>
      </div>
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
