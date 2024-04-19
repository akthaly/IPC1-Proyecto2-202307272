import * as React from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import EditarPerfil from "./pages/EditarPerfil";
import CreatePost from "./pages/Post";
import Información from "./pages/Información";
import Feed from "./pages/Feed";
import Admin from "./pages/Admin";
import Profile from "./pages/Perfil";
import Usuarios from "./pagesAdmin/ListaUsuarios";
import ListaPosts from "./pagesAdmin/ListaPosts";
import Load from "./pagesAdmin/Load";
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
    path: "/info",
    element: <Información/>,
  
  },
  {
    path: "/admin",
    element: <Admin/>,
  },
  {
    path: "/feed",
    element: <Feed/>,
  },
  {
    path: "/profile",
    element: <Profile/>
  },
  {
    path: "/profile/edit",
    element: <EditarPerfil/>,
  },
  {
    path: "/createPost",
    element: <CreatePost/>,
  },
  {
    path: "/admin/list-usuarios",
    element: <Usuarios/>
  },
  {
    path: "/admin/list-posts",
    element: <ListaPosts/>
  },
  {
    path: "/admin/load",
    element: <Load/>
  }


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <main className="dark text-foreground bg-gray-900 h-screen">
      <RouterProvider router={router} />
    </main>
    
  </React.StrictMode>,
)
