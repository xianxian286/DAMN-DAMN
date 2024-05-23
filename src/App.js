import {createBrowserRouter, Route, RouterProvider} from 'react-router-dom';
import Login from './Login/index'
import Callroll from './Callroll/callroll'
import Root from './root'
import { CourseList } from './Course/courseList';
import { CourseDetails } from './Course/courseDetails';

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
          },
          {
            path:"/courses/:id",
            element:<CourseDetails/>
          },
          
      ]);
    return ( <RouterProvider router={router} />)
}
export default App;