import { createBrowserRouter } from 'react-router-dom'
import Main from '../LayOut/Main'
import HomePage from '../Pages/HomePage/HomePage'
import Login from '../Pages/HomePage/Authentication/Login'
import Registration from '../Pages/HomePage/Authentication/Registration'
import Home from '../Pages/Home'
import Dashboard from '../Dashboard/Dashboard'
import TaskCreatorHome from '../Dashboard/TaskCreator/TaskCreatorHome'
import WorkerHome from '../Dashboard/Worker/WorkerHome'
import AdminHome from '../Dashboard/Admin/AdminHome'
import AddTask from '../Dashboard/TaskCreator/AddTask'
import MyTask from '../Dashboard/TaskCreator/MyTask'


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        // errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <HomePage/>,
            },
            {
                path: '/',
                element: <Home/>,
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Registration></Registration>
            },
        ]
    },
    {
        path:'/dashboard',
        element:<Dashboard></Dashboard>,
        children:[
            {
                path:'workerHome',
                element:<WorkerHome></WorkerHome>
            },
            {
                path:'taskCreatorHome',
                element:<TaskCreatorHome></TaskCreatorHome>,
            },
            {
                path:'addtask',
                element:<AddTask></AddTask>
            },
            {
                path:'myTask',
                element:<MyTask></MyTask>,
            },
            {
                path:'adminHome',
                element:<AdminHome></AdminHome>
            }
        ]
    }

])
