import React, { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import NavBarAdmin from "../components/NavBarAdmin";

export default function Usuarios() {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [updateTable, setUpdateTable] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/getAllUsers`);
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data.usuarios);
                    console.log(data)

                } else{
                    throw new Error('Error al obtener los usuarios');
                }
                
            } catch (error) {
                console.error(error);
                
            }
        };

        getUsers();
    }, [updateTable]);

    const viewUser = (user) => {
        setSelectedUser(user);
    }

    const viewUserClose = () => {
        setSelectedUser(null);
    }

    const deleteUser = async (carnetDelete) => {

        try {
            const response = await fetch(`http://localhost:5000/api/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ carnet: carnetDelete }),
            })

            const data = await response.json();
            console.log({ data });
            setUpdateTable(!updateTable);

        } catch (error) {
            alert("Error al eliminar el usuario");
        }


    }

    return (
        <div>
            <NavBarAdmin />
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-max w-full space-y-8">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-100">Usuario de USocial</h2>
                    </div>
                    <div className="bg-gray-700 shadow overflow-hidden sm:rounded-lg">
                        <table className="min-w-screen divide-y divide-slate-500">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Carnet</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nombre</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Apellido</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Genero</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Facultad</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="font-semibold text-slate-200 bg-slate-600 divide-y divide-slate-500">
                                {users && users.map(user => (
                                    <tr key={user.carnet}>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.carnet}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.nombre}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.apellido}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.genero}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.facultad}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button onClick={() => deleteUser(user.carnet)} className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded mr-2">Eliminar</button>
                                            <button onClick={() => viewUser(user)} className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Ver</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {selectedUser && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Detalles del Usuario</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">Carnet: {selectedUser.carnet}</p>
                                        <p className="text-sm text-gray-500">Nombre: {selectedUser.nombre}</p>
                                        <p className="text-sm text-gray-500">Apellidos: {selectedUser.apellido}</p>
                                        <p className="text-sm text-gray-500">Facultad: {selectedUser.facultad}</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button onClick={viewUserClose} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
