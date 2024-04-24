import React, { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import NavBarAdmin from "../components/NavBarAdmin";

export default function ListaPosts() {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [updateTable, setUpdateTable] = useState(false);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/getPosts`);
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data.publicaciones);
                } else {
                    throw new Error('Error al obtener los posts');
                }
            } catch (error) {
                console.error('Error al obtener los posts:', error);
            }
        };

        getPosts();
    }, [updateTable]);

    const viewPost = (post) => {
        setSelectedPost(post);
    };

    const viewPostClose = () => {
        setSelectedPost(null);
    };

    const deletePost = async (idPost) => {
        try {
            const response = await fetch(`http://localhost:5000/api/deletePost`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: idPost }),
            });

            const data = await response.json();
            if (response.ok) {
                // Actualizar la tabla de posts después de eliminar uno
                setUpdateTable(!updateTable);
            } else {
                throw new Error(data.mensaje || 'Error al eliminar el post');
            }
        } catch (error) {
            console.error('Error al eliminar el post:', error);
        }
    };

    // Función para convertir los datos de posts a CSV
    const convertToCSV = (posts) => {
        const csvData = [];
        // Agregar encabezados
        csvData.push(['ID', 'Carnet del Usuario', 'Descripción', 'Categoría', 'Fecha y Hora'].join(','));

        // Agregar filas de datos
        posts.forEach(post => {
            const row = [
                post.id,
                post.carnet,
                post.descripcion,
                post.categoria,
                new Date(post.fechaHora).toLocaleString()
            ];
            csvData.push(row.join(','));
        });

        // Unir todas las filas con un salto de línea
        return csvData.join('\n');
    };

    // Función para descargar los datos de posts en un archivo CSV
    const downloadCSV = () => {
        const csv = convertToCSV(posts);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'posts.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <NavBarAdmin />
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-max w-full space-y-8">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-100">Posts de USocial</h2>
                        {/* Botón para descargar CSV */}
                        <button onClick={downloadCSV} className="mt-4 text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
                            Descargar CSV
                        </button>
                    </div>
                    <div className="bg-gray-700 shadow overflow-hidden sm:rounded-lg">
                        <table className="min-w-screen divide-y divide-slate-500">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Carnet del Usuario</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nombre</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Apellido</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Facultad</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Carrera</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Descripción</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="font-semibold text-slate-200 bg-slate-600 divide-y divide-slate-500">
                                {posts && posts.map(post => (
                                    <tr key={post.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{post.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{post.carnet}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{post.nombre}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{post.apellido}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{post.facultad}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{post.carrera}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{post.descripcion}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button onClick={() => deletePost(post.id)} className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded mr-2">Eliminar</button>
                                            <button onClick={() => viewPost(post)} className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Ver</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {selectedPost && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Detalles del Post</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500 font-bold">ID del Post: {selectedPost.id}</p>
                                        <p className="text-sm text-gray-500 font-bold">Carnet del Usuario: {selectedPost.carnet}</p>
                                        <p className="text-sm text-gray-500 font-bold">Nombres: {selectedPost.nombre}</p>
                                        <p className="text-sm text-gray-500 font-bold">Apellidos: {selectedPost.apellido}</p>
                                        <p className="text-sm text-gray-500 font-bold">Descripción: {selectedPost.descripcion}</p>
                                        <p className="text-sm text-gray-500 font-bold">Categoría: {selectedPost.categoria}</p>
                                        <p className="text-sm text-gray-500 font-bold">Fecha y hora: {new Date(selectedPost.fechaHora).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button onClick={viewPostClose} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
