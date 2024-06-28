import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App.jsx';
import Protected from './components/routes/Protected.jsx';
import { AuthProvider } from './context/authProvider.jsx';
import './index.css';
import DetailsPage from './pages/DetailsPage.jsx';
import Watchlist from './pages/Watchlist.jsx';
import Home from './pages/home.jsx';
import Movies from './pages/movies/movies.jsx';
import Search from './pages/search/Search.jsx';
import Shows from './pages/shows/shows.jsx';

const router=createBrowserRouter([{
  path:"/",
  element:<App/>,
  children:[
  {
    path:"/",
    element:<Home/>,
  },
  {
    path:"/movies",
    element:<Movies/>,
  },
  {
    path:"/shows",
    element:<Shows/>,
  },
  {
    path:"/search",
    element:<Search/>,
  },
  {
    path:"/:type/:id",
    element:<DetailsPage/>,
  },
  {
    path:"/watchlist",
    element:(
      <Protected>
        <Watchlist/>
      </Protected>
    )
  }

]
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>
)
