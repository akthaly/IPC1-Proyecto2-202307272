import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from 'react-cookie';


export default function Login() {

    const [formData, setFormData] = useState({ //guarda todos los datos del formulario
        carnet: "", //inicializa los campos vacios para email
        password: "", //inicializa los campos vacios para password
        //si tuviera más inputs entonces agrego más campos
    });

    const [cookies, setCookies] = useCookies(['usuario']); //almacena las cookies del usuario

    const Navigate = useNavigate(); //funcion para redirigir a otra pagina

    const handleChange = (e) => { //funcion de cambio, se ejecuta cada vez que se cambia un input la (e) es un evento
        const { name, value } = e.target; //obtiene el nombre y el valor del input
        setFormData({ ...formData, [name]: value, });   /* los tres puntos son para que no se borren los datos anteriores
        y se va creando un objeto nuevo cada vez, en este caso del login, tenemos 2 objetos email, y password, y le asigna
        los nuevos valores del input a los objetos, por ejemplo si en el formulario colocan los siguientes datos:
        email: ejemplo@correo.com
        password: ejemplo
        se asignan los nuevos valores a cada objeto correspondiente*/
    };

    const handleSubmit = async (e) => { //funcion de envio, se ejecuta cada vez que se envia el formulario, hay que poner async para poder usar await
        e.preventDefault();  // para no refrescar la pagina

        //aca se puede hacer la peticion a la api, en este caso a la ruta de login

        try {
            const response = await fetch("http://localhost:5000/api/login", { //esto es una promesa, se usa await para esperar la respuesta
                method: "POST", //se usa el metodo POST para enviar los datos
                headers: {
                    "Content-Type": "application/json", //se especifica que se va a enviar un json al server.js
                },
                body: JSON.stringify(formData), //se envia el objeto formData en formato json, SOLO SIRVE PARA POST NO PARA "GET"

            })

            const data = await response.json(); //espera la respuesta del servidor y la convierte en json
            console.log({ data }); //imprime en consola la respuesta del servidor


            if (response.ok) {
                if (data.usuario.carnet === "12024" && data.usuario.password === "@adminIPC1") { //si el usuario es admin (true) entonces
                    Navigate("/admin"); // Redirigir a la página de administrador
                } else {
                    alert("Bienvenido " + data.usuario.nombre); // Muestra una alerta con el mensaje de la respuesta
                    setCookies('usuario', data.usuario, { path: '/' });
                    console.log("Los cookies son:", cookies.usuario); //imprime en consola los cookies
                    Navigate("/feed"); //redirige a la pagina principal
                }
            } else {
                alert("Usuario no encontrado"); //muestra una alerta con el mensaje de la respuesta
                throw new Error("Something went wrong"); //lanza un error con el mensaje de la respuesta o un mensaje de error
            }

        } catch (error) {
            console.log(error);
        }

    }

    return (

        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-14 h-14 mr-2" src="img/LOGO.png" alt="logo" />
                    USocial
                </Link>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Inicia Sesión
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="carnet" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Número de Carnet/Código USAC
                                </label>
                                <input
                                    type="text"
                                    name="carnet"
                                    id="carnet"
                                    value={formData.carnet}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="correo@example.com / 2023XXXXX"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                            Recuérdame
                                        </label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    ¿Olvidaste la contraseña?
                                </a>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-indigo-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:focus:ring-primary-800"
                            >
                                Iniciar sesión
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                ¿Aún no tienes cuenta?
                                <Link to="/register" className="ml-2 font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Regístrate
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    );
}
