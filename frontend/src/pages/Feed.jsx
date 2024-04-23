import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import NavBar from "../components/NavBar";



export default function Feed() {

    const [cookies] = useCookies(['usuario']);
    const datosUser = cookies.usuario || {}; // Verifica si cookies.usuario es indefinido o nulo
    const [listaObjetos, setListaObjetos] = useState([]) //aqui almaceno los datos de la lista de objetos

    const [posts, setPosts] = useState([]);

    // Esta función se ejecuta cuando el componente se monta por primera vez.
    useEffect(() => {
        // Realiza una petición GET al API para obtener los posts.
        fetch('http://localhost:5000/api/getPosts')
            .then(response => response.json())
            .then(data => {
                // Ordenar los posts por fecha y hora en orden descendente.
                const sortedPosts = data.publicaciones.sort((a, b) => {
                    // Convertir las fechas a objetos Date para compararlos correctamente.
                    const dateA = new Date(a.fechaHora);
                    const dateB = new Date(b.fechaHora);
                    // Comparar las fechas para ordenar de más reciente a más antiguo.
                    return dateB - dateA;
                });
                // Guarda los posts ordenados en el estado.
                setPosts(sortedPosts);
                
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);  


    return (
        <div className="bg-blend-screen min-h-screen">
            <NavBar />
            <div className="container mx-auto py-4">
                <h1 className="text-3xl font-bold mb-4">Feed</h1>
                <div className="space-y-4">
                    {posts.map(post => (
                        <div key={post.id} className="bg-slate-800 shadow-md rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col items-start">
                                {post.anonimo ? (
                                    <span className="text-gray-300 text-2xl">Usuario Anónimo</span>
                                ) : (
                                    <span className="text-gray-300 text-2xl">Publicado por: {post.nombre} {post.apellido}</span>
                                    
                                )}
                                {post.anonimo ? (
                                    <span className="text-gray-300 text-xl">Universidad de San Carlos de Guatemala</span>
                                ) : (
                                    <span className="text-gray-300 text-xl">{post.carrera} ({post.facultad})</span>
                                    
                                )}
                                </div>
                                <span className="text-gray-500 text-sm">
                                    {new Date(post.fechaHora).toLocaleString()}
                                </span>
                            </div>
                            <p className="mt-2 text-gray-300 text-3xl">{post.descripcion}</p>
                            {post.imagen && (
                                // Ajustar el tamaño de la imagen
                                <img src={post.imagen} alt="Imagen del post"
                                    className="w-full max-w-md h-auto rounded mt-2"
                                />
                            )}
                        </div>

                    ))}
                </div>
            </div>
        </div>

    )

}