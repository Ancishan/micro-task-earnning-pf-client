import { createBrowserRouter } from 'react-router-dom'
import Main from '../LayOut/Main'
import HomePage from '../Pages/HomePage/HomePage'
import Login from '../Pages/HomePage/Authentication/Login'
import Registration from '../Pages/HomePage/Authentication/Registration'


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
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Registration></Registration>
            },
        ]
    }

])
