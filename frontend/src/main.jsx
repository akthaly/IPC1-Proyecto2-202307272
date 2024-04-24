import * as React from "react";
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import Register from "./pages/Register";
import EditarPerfil from "./pages/EditarPerfil";
import CreatePost from "./pages/Post";
import Información from "./pages/Información";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Profile from "./pages/Perfil";
import Usuarios from "./pagesAdmin/ListaUsuarios";
import ListaPosts from "./pagesAdmin/ListaPosts";
import Estadisticas from "./pagesAdmin/Graficas";
import LoadUsers from "./pagesAdmin/LoadUsers";
import LoadPosts from "./pagesAdmin/LoadPosts";
import Tendencias from "./pages/Tendencias";
import './index.css';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: < Inicio />,
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
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/tendencias",
    element: <Tendencias/>,
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
    path: "/admin/estadisticas",
    element: <Estadisticas/>
  },
  {
    path: "/admin/loadUsers",
    element: <LoadUsers/>
  },
  {
    path: "/admin/loadPosts",
    element: <LoadPosts/>
  },


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <main className="dark text-foreground bg-gray-900 min-h-screen">
      <RouterProvider router={router} />
    </main>
    
  </React.StrictMode>,
)
