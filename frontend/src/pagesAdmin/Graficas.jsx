import React, { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import NavBarAdmin from '../components/NavBarAdmin';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export default function Estadisticas() {
    const [cookies] = useCookies(['usuario']);
    const datosUser = cookies.usuario || {};
    const [posts, setPosts] = useState([]);
    const [top5Posts, setTop5Posts] = useState([]);
    const [postsPorCategoria, setPostsPorCategoria] = useState({});
    const [top10Usuarios, setTop10Usuarios] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/getPosts')
            .then(response => response.json())
            .then(data => {
                const publicaciones = data.publicaciones;
                setPosts(publicaciones);

                // Top 5 de posts con más likes
                const top5 = publicaciones
                    .sort((a, b) => b.likes.length - a.likes.length) // Ordenar por likes en orden descendente
                    .slice(0, 5); // Obtener los primeros 5
                setTop5Posts(top5);

                // Cantidad de posts por categorías
                const categorias = {};
                publicaciones.forEach(post => {
                    if (categorias[post.categoria]) {
                        categorias[post.categoria]++;
                    } else {
                        categorias[post.categoria] = 1;
                    }
                });
                setPostsPorCategoria(categorias);

                // Top 10 usuarios con más publicaciones creadas
                const usuariosPublicaciones = {};
                publicaciones.forEach(post => {
                    if (usuariosPublicaciones[post.carnet]) {
                        usuariosPublicaciones[post.carnet]++;
                    } else {
                        usuariosPublicaciones[post.carnet] = 1;
                    }
                });

                // Convertir el objeto a una matriz para ordenar
                const usuariosOrdenados = Object.entries(usuariosPublicaciones)
                    .sort((a, b) => b[1] - a[1]) // Ordenar por cantidad de publicaciones en orden descendente
                    .slice(0, 10); // Obtener los primeros 10 usuarios
                
                setTop10Usuarios(usuariosOrdenados);
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    return (
        <div className="bg-blend-screen min-h-screen">
            <NavBarAdmin />
            <div className="container mx-auto py-4">
                <h1 className="text-3xl font-bold mb-4">Estadísticas</h1>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Top 5 posts con más likes</h2>
                    <div className="bg-slate-800 p-4 rounded-lg shadow-md">
                        <div style={{ height: '400px', width: '100%' }}>
                            <Pie
                                data={{
                                    labels: top5Posts.map(post => `${post.nombre} ${post.apellido}`),
                                    datasets: [{
                                        data: top5Posts.map(post => post.likes.length),
                                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                                    }],
                                }}
                                options={{ maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            labels: {
                                                font: {
                                                    size: 16, // Cambia el tamaño de la fuente de las etiquetas
                                                },
                                                color: 'white', // Cambia el color de las etiquetas
                                            }
                                        }
                                    } }}
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Cantidad de posts por categorías</h2>
                    <div className="bg-slate-800 p-4 rounded-lg shadow-md">
                        <div style={{ height: '400px', width: '100%' }}>
                            <Pie
                                data={{
                                    labels: Object.keys(postsPorCategoria),
                                    datasets: [{
                                        data: Object.values(postsPorCategoria),
                                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF', '#FF9F40'],
                                    }],
                                }}
                                options={{ maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            labels: {
                                                font: {
                                                    size: 16, // Cambia el tamaño de la fuente de las etiquetas
                                                },
                                                color: 'white', // Cambia el color de las etiquetas
                                            }
                                        }
                                    }}}
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Top 10 usuarios con más publicaciones</h2>
                    <div className="bg-slate-800 p-4 rounded-lg shadow-md">
                        <div style={{ height: '400px', width: '100%' }}>
                            <Bar
                                data={{
                                    labels: top10Usuarios.map(([carnet, publicaciones]) => carnet),
                                    datasets: [{
                                        data: top10Usuarios.map(([carnet, publicaciones]) => publicaciones),
                                        backgroundColor: '#36A2EB',
                                    }],
                                }}
                                options={{ maintainAspectRatio: false }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
