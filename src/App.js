import {createBrowserRouter, Route, RouterProvider} from 'react-router-dom';
import Login from './Login/index'
import Callroll from './Callroll/callroll'
import Root from './root'

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
          
      ]);
    return ( <RouterProvider router={router} />)
}
export default App;