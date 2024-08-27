import { createBrowserRouter } from 'react-router-dom';
import Main from '../LayOut/Main';
import HomePage from '../Pages/HomePage/HomePage';
import Login from '../Pages/HomePage/Authentication/Login';
import Registration from '../Pages/HomePage/Authentication/Registration';
import Home from '../Pages/Home';
import Dashboard from '../Dashboard/Dashboard';
import TaskCreatorHome from '../Dashboard/TaskCreator/TaskCreatorHome';
import WorkerHome from '../Dashboard/Worker/WorkerHome';
import AdminHome from '../Dashboard/Admin/AdminHome';
import AddTask from '../Dashboard/TaskCreator/AddTask';
import MyTask from '../Dashboard/TaskCreator/MyTask';
import TaskList from '../Dashboard/Worker/TaskList';
import TaskDetails from '../Dashboard/Worker/TaskDetails';
import MySubmission from '../Dashboard/Worker/MySubmission';
import TaskToReview from '../Dashboard/TaskCreator/TaskToReview';
import Payment from '../hooks/Payment/Payment';
import PrivateRoute from './PrivateRoute';
import ApprovalList from '../Dashboard/TaskCreator/ApprovalList';
import Pay from '../hooks/Payment/Pay';
import CompleteTask from '../Dashboard/Worker/CompleteTask';
import GetWork from '../Dashboard/TaskCreator/GetWork';
import WorkerProfile from '../Dashboard/Worker/WorkerProfile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/home',
        element: <PrivateRoute><Home /></PrivateRoute>,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Registration />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: 'workerHome',
        element: <WorkerHome />,
      },
      {
        path: 'taskList',
        element: <TaskList />,
        loader: () => fetch('http://localhost:8000/tasks'),
      },
      {
        path: 'view/:id',
        element: <TaskDetails />,
      },
      {
        path: 'mySubmission',
        element: <MySubmission />,
      },
      {
        path: 'taskCreatorHome',
        element: <TaskCreatorHome />,
      },
      {
        path: 'addtask',
        element: <AddTask />,
      },
      {
        path: 'myTask',
        element: <MyTask />,
      },
      {
        path: 'reviewTask',
        element: <TaskToReview />,
      },
      {
        path: 'approveList',
        element: <ApprovalList />,
      },
      {
        path: 'payment',
        element: <Payment />,
      },
      {
         path:"workerProfile",
          element:<WorkerProfile /> 
      },
      {
        path: 'adminHome',
        element: <AdminHome />,
      },
    ],
  },
]);
