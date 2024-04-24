import React, { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import NavBar from "../components/NavBar";

export default function Tendencias() {
    const [cookies] = useCookies(['usuario']);
    const datosUser = cookies.usuario || {}; // Verifica si cookies.usuario es indefinido o nulo
    const [posts, setPosts] = useState([]);
    const [likes, setLikes] = useState({});
    const [comments, setComments] = useState({});

    // Esta función se ejecuta cuando el componente se monta por primera vez.
    useEffect(() => {
        // Realiza una petición GET al API para obtener los posts.
        fetch('http://localhost:5000/api/getPosts')
            .then(response => response.json())
            .then(data => {
                // Inicializar los likes y comentarios con los datos de los posts
                const initialLikes = {};
                const initialComments = {};
                data.publicaciones.forEach(post => {
                    initialLikes[post.id] = post.likes.length;
                    initialComments[post.id] = post.comentarios;
                });
                setLikes(initialLikes);
                setComments(initialComments);

                // Ordenar los posts por la cantidad de likes y comentarios, de forma descendente
                const sortedPosts = data.publicaciones.sort((a, b) => {
                    // Ordenar por la suma de likes y comentarios en orden descendente
                    const likesDifference = (b.likes.length) - (a.likes.length);
                    if (likesDifference !== 0) {
                        return likesDifference; // Si hay diferencia en likes, ordenar por likes
                    }

                    // Si los likes son iguales, ordenar por la cantidad de comentarios
                    return (b.comentarios.length) - (a.comentarios.length);
                });
                
                // Guarda los posts ordenados en el estado
                setPosts(sortedPosts);
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    const handleLike = (postId) => {
        fetch(`http://localhost:5000/api/Like`, {
            method: 'POST',
            body: JSON.stringify({ postId, userId: datosUser.carnet }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.mensaje === 'Like agregado exitosamente') {
                    setLikes((prevLikes) => ({
                        ...prevLikes,
                        [postId]: (prevLikes[postId] || 0) + 1
                    }));
                } else if (data.mensaje === 'Like eliminado exitosamente') {
                    setLikes((prevLikes) => ({
                        ...prevLikes,
                        [postId]: (prevLikes[postId] || 0) - 1
                    }));
                }
            });
    };

    const handleAddComment = (postId, text) => {
        fetch(`http://localhost:5000/api/addComment`, {
            method: 'POST',
            body: JSON.stringify({ postId, userId: datosUser.carnet, text }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.mensaje === 'Comentario agregado exitosamente') {
                    setComments((prevComments) => ({
                        ...prevComments,
                        [postId]: [...(prevComments[postId] || []), data.comentario]
                    }));
                }
            });
    };

    return (
        <div className="bg-blend-screen min-h-screen">
            <NavBar />
            <div className="container mx-auto py-4">
                <h1 className="text-3xl font-bold mb-4">Tendencias</h1>
                <div className="space-y-4">
                    {posts.map(post => (
                        <div key={post.id} className="bg-slate-800 shadow-md rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col items-start">
                                    {post.anonimo ? (
                                        <span className="text-gray-300 font-bold text-2xl">Usuario Anónimo</span>
                                    ) : (
                                        <span className="text-gray-300 font-bold text-2xl">{post.nombre} {post.apellido}</span>
                                    )}
                                    {post.anonimo ? (
                                        <span className="text-gray-300 text-xl">Universidad de San Carlos de Guatemala</span>
                                    ) : (
                                        <span className="text-gray-300 text-xl">{post.carrera} ({post.facultad})</span>
                                    )}
                                </div>
                                <span className="text-orange-500 text-lg mb-10"> {post.categoria}</span>
                                <span className="text-gray-500 text-sm">
                                    {new Date(post.fechaHora).toLocaleString()}
                                </span>
                            </div>
                            <p className="mt-2 text-gray-300">{post.descripcion}</p>
                            {post.imagen && (
                                <img src={post.imagen} alt="Imagen del post"
                                    className="w-full max-w-md h-auto rounded mt-2"
                                />
                            )}
                            <div className="flex justify-between items-center mt-4">
                                <button onClick={() => handleLike(post.id)} className="text-orange-500">
                                    {likes[post.id] || post.likes.length} ❤️
                                </button>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Agregar un comentario..."
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleAddComment(post.id, e.target.value);
                                                e.target.value = '';
                                            }
                                        }}
                                        className="text-slate-200 px-2 py-1 rounded-md focus:outline-none"
                                    />
                                    <div>
                                        {(comments[post.id] || post.comentarios).map((comment, index) => (
                                            <div key={index}>
                                                <p>{comment.nombre} {comment.apellido}: {comment.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
