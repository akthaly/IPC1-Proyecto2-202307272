import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import NavBar from "../components/NavBar";


export default function Feed() {

    const [cookies] = useCookies(['usuario']);
    const datosUser = cookies.usuario || {}; // Verifica si cookies.usuario es indefinido o nulo
    const [listaObjetos, setListaObjetos] = useState([]) //aqui almaceno los datos de la lista de objetos

    useEffect (() => {
        try {
            const response = fetch("http://localhost:5000/api/getPosts", { //esto es una promesa, se usa await para esperar la respuesta
                method: "GET", //se usa el metodo GET para obtener los datos
                headers: {
                    "Content-Type": "application/json", //se especifica que se va a enviar un json al server.js
                },
            })

            const data = response.json(); //espera la respuesta del servidor y la convierte en json
            setListaObjetos(data) //almacena los datos de la lista de objetos
            
        } catch (error) {
            console.log(error)
            
        }

    })

    function viewIDPost(postId) {
        console.log("ID del post: ", postId)
    }


    return (
        <div>
            <NavBar />
            <div className="flex justify-center items-center">
                <div className="pt-2.5 flex flex-col items-center">
                    {listaObjetos.map((objeto) => (
                        <div className="bg-slate-300 rounded-lg shadow-md m-5 p-5 mx-auto w-5/6" key={objeto.id}>
                            <div className="mb-2.5">
                                <p>Usuario: {objeto.carnet}</p>
                                <p>Fecha: {new Date(objeto.fechaHora).toLocaleString}</p>
                            </div>
                            <div className="flex justify-center items-center">
                                {objeto.imagen && <img src={objeto.imagen} alt="..." className="w-1/2 rounded-lg mb-2.5" />}
                            </div>
                            <p>{objeto.descripcion}</p>
                            <button onClick={()=> viewIDPost(objeto.id)}>Comentarios</button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )

}