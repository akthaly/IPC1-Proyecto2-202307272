import * as React from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import EditarPerfil from "./pages/EditarPerfil";
import CreatePost from "./pages/CreatePost";
import Información from "./pages/Información";
import './index.css';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: < Home />,
  },
  {
    path: "/register",
    element: < Register />,
  },
  {
    path: "/login",
    element: < Login />,
  },
  {
    path: "/edit",
    element: <EditarPerfil/>,
  },
  {
    path: "/createPost",
    element: <CreatePost/>,
  },
  {
    path: "/info",
    element: <Información/>,
  
  },
  

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <main className="dark text-foreground bg-gray-900 h-screen">
      <RouterProvider router={router} />
    </main>
    
  </React.StrictMode>,
)
