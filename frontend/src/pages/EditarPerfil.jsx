import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { Button } from '@nextui-org/react'
import { Link } from 'react-router-dom';

import { useCookies } from 'react-cookie';


export default function EditarPerfil() {
    const [cookies] = useCookies(['usuario']); //almacena las cookies del usuario
    const datosUser = cookies.usuario || {}; // Verifica si cookies.usuario es indefinido o nulo
    const carnet = datosUser.carnet;


    const [formData, setFormData] = useState({

        carnet: carnet,
        nombre: '',
        apellido: '',
        genero: '',
        email: '',
        facultad: '',
        carrera: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target; //obtiene el nombre y el valor del input
        setFormData({ ...formData, [e.target.name]: e.target.value }); //los tres puntos son para que no se borren los datos anteriores
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/update", {
                method: "PUT", //se usa el metodo PUT para enviar los datos
                headers: {
                    "Content-Type": "application/json" //se especifica que se va a enviar un json al server.js
                },
                body: JSON.stringify(formData), //se envia el objeto formData en formato json, SOLO SIRVE PARA POST NO PARA "GET"
            })
            if (response.ok){
                alert("Datos actualizados correctamente")
                setCookies('usuario', data.usuario, { path: '/' });
            }else{
                alert("Error al actualizar los datos")
            }

        } catch (error) {
            console.log(error);

        }
        console.log(formData);
    }

    const handleLogout = () => {
        removeCookie('usuario', { path: '/' });
    };

    return (
        <div>
            <NavBar />
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <form onSubmit={handleSubmit} className="flex items-center flex-col w-2/5">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-3xl font-semibold leading-7 text-white text-left">USocial - Editar mi Perfil</h2>

                    <div className="mt-20 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-3">
                            <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-white">
                                Nombres
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="nombre"
                                    id="nombre"
                                    required
                                    style={{ paddingLeft: '10px' }}
                                    autoComplete="given-name"
                                    placeholder="Ingrese sus nombres"
                                    value={formData.nombre} // se envia el valor del input
                                    onChange={handleChange} // cada vez que cambie el input se ejecutará esta función
                                    className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="apellido" className="block text-sm font-medium leading-6 text-white">
                                Apellidos
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="apellido"
                                    id="apellido"
                                    required
                                    style={{ paddingLeft: '10px' }}
                                    autoComplete="family-name"
                                    placeholder="Ingrese sus apellidos"
                                    value={formData.apellido} // se envia el valor del input
                                    onChange={handleChange} // cada vez que cambie el input se ejecutará esta función
                                    className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="genero" className="block text-sm font-medium leading-6 text-white">
                                Género
                            </label>
                            <div className="mt-2">
                                <select
                                    id="genero"
                                    name="genero"
                                    required
                                    value={formData.genero} // se envia el valor del input
                                    onChange={handleChange} // cada vez que cambie el input se ejecutará esta función
                                    className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option>Femenino</option>
                                    <option>Masculino</option>
                                    <option>Prefiero no decirlo</option>
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Correo Electrónico
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    style={{ paddingLeft: '10px' }}
                                    autoComplete="email"
                                    placeholder="correo@example.com"
                                    value={formData.email} // se envia el valor del input
                                    onChange={handleChange} // cada vez que cambie el input se ejecutará esta función
                                    className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="facultad" className="block text-sm font-medium leading-6 text-white">
                                Facultad
                            </label>
                            <div className="mt-2">
                                <input
                                    id="facultad"
                                    name="facultad"
                                    type="text"
                                    required
                                    style={{ paddingLeft: '10px' }}
                                    placeholder="Ingeniería, Ciencias Jurídicas, etc."
                                    value={formData.facultad} // se envia el valor del input
                                    onChange={handleChange} // cada vez que cambie el input se ejecutará esta función
                                    className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />

                            </div>

                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="carrera" className="block text-sm font-medium leading-6 text-white">
                                Carrera
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="carrera"
                                    id="carrera"
                                    required
                                    style={{ paddingLeft: '10px' }}
                                    placeholder="Ingeniería en Sistemas, Derecho, etc."
                                    value={formData.carrera} // se envia el valor del input
                                    onChange={handleChange} // cada vez que cambie el input se ejecutará esta función
                                    className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>




                        <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                Contraseña
                            </label>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    required
                                    style={{ paddingLeft: '10px' }}
                                    value={formData.password} // se envia el valor del input
                                    onChange={handleChange} // cada vez que cambie el input se ejecutará esta función
                                    className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-white">
                                Confirmar Contraseña
                            </label>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    required
                                    style={{ paddingLeft: '10px' }}
                                    value={formData.confirmPassword} // se envia el valor del input
                                    onChange={handleChange} // cada vez que cambie el input se ejecutará esta función
                                    className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Link to={"/profile"}>
                            Cancelar
                        </Link>
                        <Button to={"/profile"}
                            type="submit"
                            onClick={handleLogout}
                            className="text-current font-bold transition ease-in-out delay-150 bg-emerald-800
                          hover:-translate-y-1 hover:scale-110 hover:bg-emerald-500 duration-300"
                        >
                            Guardar
                        </Button>
                    </div>
                </div>
            </form>
        </div>
        </div>
    );
}
