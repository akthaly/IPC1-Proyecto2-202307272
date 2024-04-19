import React, { useState } from "react";
import { Button } from '@nextui-org/react'
import NavBar from "../components/NavBar";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from 'react-cookie';



export default function CreatePost() {
    const [cookies] = useCookies(['usuario']); //almacena las cookies del usuario
    const datosUser = cookies.usuario || {}; // Verifica si cookies.usuario es indefinido o nulo
    const carnet = datosUser.carnet;


    const [anonima, setAnonimo] = useState(false); //inicializa el estado de anonimo en falso
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState('');
    const [imagenURL, setImagenURL] = useState('');

    const handleDescripcionChange = (event) => {
        setDescripcion(event.target.value);
    };

    const handleImagenChange = (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];

        reader.onloadend = () => {
            setImagen(reader.result);
            setImagenURL(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };
    const handleEsAnonimaChange = (event) => {
        setAnonimo(event.target.checked);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const dataJson = {
            carnet: carnet,
            descripcion: descripcion,
            imagen: imagen,
            anonima: anonima,
        }

        fetch(`http://localhost:5000/api/createPost`, {
            method: "POST",
            body: JSON.stringify(dataJson),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((res) => {

                console.log(res)
                alert(res.mensaje)
                setImagenURL('');
                console.log(dataJson)
            })
            .catch((error) => console.error(error))

    };

    return (
        <div >
            <NavBar />
            <div className="flex justify-center items-center mt-20">
                <div className="bg-slate-700 rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold mb-4">Crear Publicación</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="descripcion" className="block text-gray-100">Descripción:</label>
                            <textarea
                                id="descripcion"
                                value={descripcion}
                                onChange={handleDescripcionChange}
                                rows="4"
                                required
                                className="text-slate-900 w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:border-blue-500 bg-white"
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="imagen" className="block text-gray-700">Imagen:</label>
                            <input
                                type="file"
                                id="imagen"
                                accept="image/*"
                                onChange={handleImagenChange}
                                className="mt-1 block w-full"
                            />
                        </div>
                        <div>
                            {imagenURL && (
                                <img
                                    src={imagenURL}
                                    alt="Preview"
                                    style={{ maxWidth: '150px' }}
                                    className="mt-4 mx-auto"
                                />
                            )}
                        </div>
                        <div className="flex justify-end items-end">
                            <label htmlFor="anonima" className="block text-gray-100">¿Publicar como anónimo?</label>
                            <input
                                type="checkbox"
                                id="anonima"
                                checked={anonima}
                                onChange={handleEsAnonimaChange}
                                className="ml-2 mb-1"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            Publicar

                        </button>

                    </form>
                </div>
            </div>
        </div>

    )
}
