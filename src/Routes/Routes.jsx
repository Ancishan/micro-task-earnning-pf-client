import { createBrowserRouter } from 'react-router-dom'
import Main from '../LayOut/Main'
import HomePage from '../Pages/HomePage/HomePage'


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
        ]
    }

])
