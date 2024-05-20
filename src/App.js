import {createBrowserRouter, Route, RouterProvider} from 'react-router-dom';
import Login from './Login/index'
import Callroll from './Callroll/callroll'
import Root from './root'
import { CourseList } from './Course/courseList';

const App = () => {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Root />
        },
        {
            path: "/login",
            element: <Login/>
          },
          {
            path: "/callroll",
            element:<Callroll/>
          },
          {
            path:"/courses",
            element:<CourseList/>
          }
          
      ]);
    return ( <RouterProvider router={router} />)
}
export default App;