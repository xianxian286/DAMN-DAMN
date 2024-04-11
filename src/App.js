import {createBrowserRouter, Route, RouterProvider} from 'react-router-dom';
import Login from './Login'
import Callroll from './callroll'

const App = () => {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <div>Hello world!</div>,
        },
        {
            path: "/login",
            element: <Login/>
          },
          {
            path: "/callroll",
            element:<div> 点名</div>
          },
      ]);
    return ( <RouterProvider router={router} />)
}
export default App;