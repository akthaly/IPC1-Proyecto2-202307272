import React, { useState } from 'react';
import NavBarAdmin from '../components/NavBarAdmin';

export default function LoadUsers() {
    const [jsonData, setJsonData] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const content = event.target.result;
            try {
                const data = JSON.parse(content);
                console.log('Contenido del archivo:', data);

                // Verifica si data es un array
                if (!Array.isArray(data)) {
                    if (data.usuarios && Array.isArray(data.usuarios)) {
                        // Utiliza data.usuarios para actualizar jsonData y ocultar las contraseñas
                        const usuariosSinPassword = data.usuarios.map(user => {
                            const { password, ...rest } = user;
                            return rest;
                        });
                        setJsonData(usuariosSinPassword);
                        await handleSubmit(data.usuarios);
                    } else {
                        console.error('Los datos no son un array. Verifica la estructura del archivo JSON.');
                    }
                } else {
                    // Utiliza data para actualizar jsonData y ocultar las contraseñas
                    const usuariosSinPassword = data.map(user => {
                        const { password, ...rest } = user;
                        return rest;
                    });
                    setJsonData(usuariosSinPassword);
                    await handleSubmit(data);
                }
            } catch (error) {
                console.error('Error al analizar el archivo JSON:', error);
            }
        };
        reader.readAsText(file);
    };
    

    const handleSubmit = async (data) => {
        // Asegúrate de que data sea un array
        if (!Array.isArray(data)) {
            console.error('Los datos no son un array. Verifica la estructura del archivo JSON.');
            return;
        }
    
        // Mantiene un seguimiento de cuántos usuarios se registraron con éxito
        let successfulRegistrations = 0;
    
        for (const user of data) {
            try {
                const response = await fetch('http://localhost:5000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                });
    
                if (!response.ok) {
                    const responseData = await response.json();
                    console.error('Error al registrar el usuario con carnet', user.carnet, ':', responseData);
                    continue;  // Saltar al siguiente usuario si hay un error
                }
    
                console.log('Usuario registrado con éxito:', user.carnet);
                successfulRegistrations++;  // Incrementar el contador de registros exitosos
            } catch (error) {
                console.error('Error al enviar el usuario con carnet', user.carnet, 'al backend:', error);
            }
        }
    
        // Mostrar una alerta cuando se terminen de registrar todos los usuarios
        if (successfulRegistrations === data.length) {
            alert('Todos los usuarios se han registrado con éxito');
        } else {
            alert('Se registraron algunos usuarios con éxito, pero hubo errores en otros');
        }
    };
    

    return (
        <div className=" min-h-screen">
            <NavBarAdmin />
            <div className="max-w-4xl mx-auto py-8">
                <h2 className="text-3xl font-semibold mb-4">Carga Masiva de Usuarios</h2>
                <div className="bg-slate-800 shadow-md rounded-md p-6 mb-6">
                    <label htmlFor="fileInput" className="block text-sm font-medium text-slate-300 mb-2">
                        Selecciona un archivo JSON:
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        onChange={handleFileChange}
                        className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md p-2"
                    />
                </div>
                <div className="bg-slate-800 shadow-md rounded-md p-6">
                    <h2 className="text-3xl font-semibold mb-4">Datos cargados:</h2>
                    <pre className="overflow-auto max-h-80 p-2 border border-gray-200 rounded-md">
                        {JSON.stringify(jsonData, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
}