import React, { useState } from "react";
import { Button } from '@nextui-org/react'
import { Link } from 'react-router-dom';

export default function EditarPerfil(){
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        genero: '',
        correo: '',
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

    return(
        
    );
}
