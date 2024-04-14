import React, { useState } from "react";
import { Button } from '@nextui-org/react'
import { Link } from 'react-router-dom';

export default function Register() {

    const [formData, setFormData] = useState({ //guarda todos los datos del formulario

        //inicializa los campos vacios para las constantes

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

    const handleChange = (e) => {  //funcion de cambio, se ejecuta cada vez que se cambia un input la (e) es un evento
        const { name, value } = e.target; //obtiene el nombre y el valor del input
        setFormData({ ...formData, [e.target.name]: e.target.value }); //los tres puntos son para que no se borren los datos anteriores
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // para no refrescar la pagina

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", { //esto es una promesa, se usa await para esperar la respuesta
                method: "POST", //se usa el metodo POST para enviar los datos
                headers: {
                    "Content-Type": "application/json", //se especifica que se va a enviar un json al server.js
                },
                body: JSON.stringify(formData), //se envia el objeto formData en formato json, SOLO SIRVE PARA POST NO PARA "GET"
            })

            if (!response.ok) { //si la respuesta no es correcta
                alert("Usuario ya existe"); //muestra una alerta con el mensaje de la respuesta
                throw new Error("Something went wrong"); //lanza un error con el mensaje de la respuesta o un mensaje de error
            } else {
                alert("Usuario creado"); //muestra una alerta con el mensaje de la respuesta
            }

        } catch (error) {
            console.log(error);
        }
    }

        return (
            <section class="bg-gray-50 dark:bg-gray-900">
                <div class="flex flex-col items-center justify-center w-1/2 px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <form
                            onSubmit={handleSubmit} //cuando se envie el formulario se ejecuta la funcion handleSubmit
                            className="flex items-center flex-col ">
                            <div
                                className="border-b border-gray-900/10 pb-12 m-5 p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h2
                                    className="mt-5 text-3xl font-semibold leading-7 text-white text-center">
                                    USocial - Registro
                                </h2>
                                <p
                                    className="mt-1 text-sm leading-6 text-gray-400 text-center">
                                    Llene los datos que le solicitan.
                                </p>

                                <div
                                    className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div
                                        className="col-span-full">
                                        <label
                                            htmlFor="carnet"
                                            className="block text-sm font-medium leading-6 text-white">
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
                                                value={formData.carnet} //se envia el valor del input, en este caso el carnet
                                                onChange={handleChange} //cada vez que cambie el input se ejecuta la funcion
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
                                                value={formData.nombres} //se envia el valor del input, en este caso los nombres
                                                onChange={handleChange} //cada vez que cambie el input se ejecuta la funcion
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
                                                value={formData.apellidos} //se envia el valor del input, en este caso los apellidos
                                                onChange={handleChange} //cada vez que cambie el input se ejecuta la funcion
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
                                                value={formData.genero} //se envia el valor del input, en este caso el genero
                                                onChange={handleChange} //cada vez que cambie el input se ejecuta la funcion
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
                                                placeholder="correo@example.com" //placeholder es el texto que se muestra como ejemplo
                                                value={formData.email} //se envia el valor del input, en este caso el correo
                                                onChange={handleChange} //cada vez que cambie el input se ejecuta la funcion
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
                                                value={formData.facultad} //se envia el valor del input, en este caso la facultad
                                                onChange={handleChange} //cada vez que cambie el input se ejecuta la funcion
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
                                                value={formData.carrera} //se envia el valor del input, en este caso la carrera
                                                onChange={handleChange} //cada vez que cambie el input se ejecuta la funcion
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
                                                value={formData.password} //se envia el valor del input, en este caso la contraseña
                                                onChange={handleChange} //cada vez que cambie el input se ejecuta la funcion
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
                                                value={formData.confirmPassword} //se envia el valor del input, en este caso la confirmacion de la contraseña
                                                onChange={handleChange} //cada vez que cambie el input se ejecuta la funcion
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
