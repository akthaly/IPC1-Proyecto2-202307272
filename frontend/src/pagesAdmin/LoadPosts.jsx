import React, { useState } from 'react';
import NavBarAdmin from '../components/NavBarAdmin';

export default function LoadPosts() {
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
    
                // Si data es un objeto con una propiedad llamada 'posts' que contiene un array, extraer esa propiedad
                if (data && typeof data === 'object' && Array.isArray(data.posts)) {
                    setJsonData(data.posts);
                    await handleSubmit(data.posts);
                } else if (Array.isArray(data)) {
                    setJsonData(data);
                    await handleSubmit(data);
                } else {
                    console.error('Los datos no son un array. Verifica la estructura del archivo JSON.');
                }
            } catch (error) {
                console.error('Error al analizar el archivo JSON:', error);
            }
        };
        reader.readAsText(file);
    };
    

    const handleSubmit = async (data) => {
        // Verifica si data es un array
        if (Array.isArray(data)) {
            for (const post of data) {
                try {
                    // Envía cada post individualmente al backend
                    const response = await fetch('http://localhost:5000/api/createPost', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(post),
                    });
    
                    // Analiza la respuesta del backend
                    const responseData = await response.json();
    
                    // Verifica si la respuesta es exitosa
                    if (!response.ok) {
                        console.error(`Error al registrar el post con título "${post.titulo}":`, responseData);
                        continue;  // Continúa con el siguiente post si hay un error
                    }
    
                    console.log(`Post "${post.titulo}" registrado con éxito:`, responseData);
    
                } catch (error) {
                    console.error(`Error al enviar el post con título "${post.titulo}" al backend:`, error);
                }
            }
        } else {
            console.error('Los datos no son un array. Verifica la estructura del archivo JSON.');
        }
    };
    
    


    return (
        <div className=" min-h-screen">
            <NavBarAdmin />
            <div className="max-w-4xl mx-auto py-8">
                <h2 className="text-3xl font-semibold mb-4">Carga Masiva de Posts</h2>
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