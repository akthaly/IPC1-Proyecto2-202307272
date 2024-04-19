import React, { useState } from 'react';
import NavBarAdmin from '../components/NavBarAdmin';

export default function Load() {
    const [jsonData, setJsonData] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const content = event.target.result;
            try {
                const data = JSON.parse(content);
                // Eliminar la contraseña de cada objeto
                const datosSinPassword = data.map(obj => {
                    const { password, ...rest } = obj;
                    return rest;
                });
                setJsonData(datosSinPassword);
                await handleSubmit(data);
            } catch (error) {
                console.error('Error al analizar el archivo JSON:', error);
            }
        };
        reader.readAsText(file);
    };

    const handleSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();

            if (!response.ok) {
                console.error('Error al registrar los usuarios:', responseData);
                return;
            }

            console.log('Respuesta del backend:', responseData);


        } catch (error) {
            console.error('Error al enviar el archivo al backend', error);
        }
    };


    return (
        <div className=" min-h-screen">
            <NavBarAdmin />
            <div className="max-w-4xl mx-auto py-8">
                <h2 className="text-3xl font-semibold mb-4">Cargar archivo JSON</h2>
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
