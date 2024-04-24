import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

export default function Perfil() {

    const [cookies, removeCookie] = useCookies(['usuario']);
    const datosUser = cookies.usuario || {}; // Verifica si cookies.usuario es indefinido o nulo
    const carnet = datosUser.carnet;
    const nombre = datosUser.nombre;
    const apellido = datosUser.apellido;
    const genero = datosUser.genero;
    const correo = datosUser.email;
    const facultad = datosUser.facultad;
    const carrera = datosUser.carrera;
    console.log(datosUser);

    const handleLogout = () => {
        console.log('Cookies antes de eliminar:', cookies);
        removeCookie('usuario', { path: '/' }); // Eliminar la cookie 'usuario' con el ámbito '/'

        // Depuración adicional para verificar si la cookie se ha eliminado
        setTimeout(() => {
            console.log('Cookies después de eliminar:', cookies);
        }, 500); // Usar un breve retraso para dar tiempo a que la cookie se elimine
    };

    return (
        <div className="min-h-screen bg-slate-900">
            <NavBar />

            <div className="flex justify-center items-center py-8">
                <div className="max-w-md w-full bg-slate-800 rounded-2xl shadow-large p-6">
                    <h2 className="text-2xl font-semibold mb-4">Perfil del Usuario</h2>

                    <div className="flex flex-col items-center">
                        <div className="mb-4">
                            <img
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                alt="Perfil"
                                className="rounded-full w-24 h-24 border-2 border-gray-300"
                            />
                        </div>

                        <div className="text-center">
                            <p className="font-bold">TUS DATOS:</p>
                            <p className="text-lg font-medium">Nombre: {nombre}  {apellido}</p>
                            <p className="text-gray-200 font-semibold">Carnet: {carnet}</p>
                            <p className="text-gray-200 font-semibold">{genero}</p>
                            <p className="text-gray-200 font-semibold">Correo: {correo}</p>
                            <p className="text-gray-200 font-semibold">Facultad: {facultad}</p>
                            <p className="text-gray-200 font-semibold">Carrera: {carrera}</p>
                        </div>

                        <div className="mt-6 flex flex-col items-center">
                            <Link to="/profile/edit">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4">
                                    Editar Perfil
                                </button>
                            </Link>
                            <Link to="/">
                                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                                    Cerrar Sesión
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}