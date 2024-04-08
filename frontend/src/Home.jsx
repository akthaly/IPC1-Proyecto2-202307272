import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@nextui-org/react'



export default function Home() {

  return (
    <main className='h-screen flex flex-col justify-center items-center'>
      <header>
        <h1 className='text-center text-4xl font-bold'>
          USocial
        </h1>
        <div className='flex justify-center'>
          <img src="img\LOGO.png"
            alt="LOGO USocial"
            className='w-1/5 h-auto'
          />
        </div>
        <p className='text-center object-left'>
          Esta es una red social creada para la Universidad de San Carlos de Guatemala,<br></br>
          desarrollada por el estudiante Bryan Alejandro Anona Paredes <br />
          Carnet: 202307272 <br />
          CUI: 3060396800304.
        </p>
      </header>
      <section className='flex flex-col items-center my-4'>
        <div className='flex flex-col items-center'>
          <h2 className='font-bold'>Contacto de soporte.</h2>
          <p>3060396800304@ingenieria.usac.edu.gt</p>
        </div>
        <div className='flex gap-5 my-5'>
          <Link to="/login">
            <Button className='transition ease-in-out delay-150 bg-blue-500
             hover:-translate-y-1 hover:scale-110 hover:bg-blue-300 duration-300'>Iniciar Sesión</Button>
          </Link>
          <Link to="/registro" >
            <Button className='transition ease-in-out delay-150 bg-purple-700
             hover:-translate-y-1 hover:scale-110 hover:bg-violet-500 duration-300'>Registrarse</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
