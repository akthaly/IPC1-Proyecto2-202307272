import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData,[name]: value,});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({formData});
    }

    return (

        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link to="/" 
                class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img class="w-14 h-14 mr-2" src="img/LOGO.png" alt="logo" />
                    USocial
                </Link>
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Inicia Sesión
                        </h1>
                        <form 
                        class="space-y-4 md:space-y-6" 
                        onSubmit={handleSubmit}>
                            <div>
                                <label
                                    for="email"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Número de Carnet/Código USAC</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="correo@example.com / 2023XXXXX"/>
                            </div>
                            <div>
                                <label
                                    for="password"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label
                                            for="remember"
                                            class="text-gray-500 dark:text-gray-300">
                                            Recuerdame
                                        </label>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Olvidaste la contraseña?
                                </a>
                            </div>
                            <button
                                type="submit"
                                class="w-full text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-indigo-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:focus:ring-primary-800">
                                Sign in
                            </button>
                            <p
                                class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Aún no tienes cuenta?
                                <a href="/register" class="ml-2 font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Registrate
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    );
}
