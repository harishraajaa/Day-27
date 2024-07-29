import Users from "./components/Users"
import Create from "./components/Create"
import {Navigate} from 'react-router-dom'

export default [
    {
        path:"/users",
        element:<Users/>
    },
    {
        path:"/create",
        element:<Create/>
    },
    {
        path:"/create/:id",
        element:<Create/>
    },
    {
        path:'*',
        element:<Navigate to="/users"/>
    }
]