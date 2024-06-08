import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App.jsx';
import './index.css';
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
]
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
