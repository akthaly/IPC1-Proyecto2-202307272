import React, { useState } from "react";
import { Button } from '@nextui-org/react'
import { Link } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({
        carnet: '',
        nombres: '',
        apellidos: '',
        genero: '',
        email: '',
        facultad: '',
        carrera: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar los datos a tu backend
        console.log(formData);
    }

    return (
        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center w-1/2 px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <form onSubmit={handleSubmit} className="flex items-center flex-col ">
                        <div className="border-b border-gray-900/10 pb-12 m-5 p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h2 className="mt-5 text-3xl font-semibold leading-7 text-white text-center">USocial - Registro</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-400 text-center">Llene los datos que le solicitan.</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full">
                                    <label htmlFor="carnet" className="block text-sm font-medium leading-6 text-white">
                                        Número de Carnet / Código USAC
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="carnet"
                                            id="carnet"
                                            style={{ paddingLeft: '10px' }}
                                            autoComplete="carnet"
                                            placeholder="2023XXXXX"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="nombres" className="block text-sm font-medium leading-6 text-white">
                                        Nombres
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="nombres"
                                            id="nombres"
                                            style={{ paddingLeft: '10px' }}
                                            autoComplete="given-name"
                                            placeholder="Ingrese sus nombres"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="apellidos" className="block text-sm font-medium leading-6 text-white">
                                        Apellidos
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="apellidos"
                                            id="apellidos"
                                            style={{ paddingLeft: '10px' }}
                                            autoComplete="family-name"
                                            placeholder="Ingrese sus apellidos"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                            style={{ paddingLeft: '10px' }}
                                            autoComplete="email"
                                            placeholder="correo@example.com"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                            style={{ paddingLeft: '10px' }}
                                            placeholder="Ingeniería, Ciencias Jurídicas, etc."
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                            style={{ paddingLeft: '10px' }}
                                            placeholder="Ingeniería en Sistemas, Derecho, etc."
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                </div>




                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-white">
                                        Contraseña
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            style={{ paddingLeft: '10px' }}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                        Confirmar Contraseña
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            style={{ paddingLeft: '10px' }}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <p className="text-sm font-semibold leading-6 text-white">
                                    Ya tienes una cuenta?

                                    <Link to="/login"
                                        type="button"
                                        className="ml-2 text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        Inicia Sesión
                                    </Link>

                                </p>

                                <Button
                                    type="submit"
                                    className="text-current font-bold transition ease-in-out delay-150 bg-indigo-600
                          hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                                >
                                    Guardar
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
