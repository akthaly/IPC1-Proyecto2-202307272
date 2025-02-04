import React from "react";
import { Link } from "react-router-dom";

const links = [
    { name: 'Instagram', href: 'https://www.instagram.com/akthaly.xzh' },
    { name: 'Facebook', href: 'https://www.facebook.com/akthalyxzh/' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@akthalyxzh' },
]
const stats = [
    { name: 'Desarrollador', value: 'Alejandro Anona' },
    { name: 'Carnet', value: '202307272' },
    { name: 'Curso', value: 'Laboratorio IPC1' },
    { name: 'CUI', value: '3060396800304' },
]

export default function Información() {

    return (
        <div className="h-screen relative isolate overflow-hidden bg-gray-900 sm:py-10">
            <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
            />
            <div
                className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                aria-hidden="true"
            >
                <div
                    className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
            <div
                className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
                aria-hidden="true"
            >
                <div
                    className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex flex-wrap  lg:justify-between mx-auto max-w-2xl lg:mx-0">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <Link to = "/">
                    <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">¿Qué es USocial?</h2>
                    </Link>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        Es una red social diseñada específicamente para la universidad de San Carlos de Guatemala,
                        en esta nueva red social podras ver y compartir con tus amigos de la universidad,
                        podrás realizar distintos tipos de posts así como también reaccionar y comentar los mismos.
                    </p>
                </div>

                </div>

                <div className="mx-auto mt-28 max-w-2xl lg:mx-0 lg:max-w-none">
                    <h3 className="text-2xl font-bold tracking-tight text-white">Información de Contacto:</h3>
                    <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                        {links.map((link) => (
                            <a key={link.name} href={link.href} target="_blank">
                                {link.name} <span aria-hidden="true">&rarr;</span>
                            </a>
                        ))}
                        <h1>Correo: 3060396800304@ingenieria.usac.edu.gt</h1>
                    </div>
                    <dl className="mt-1 grid grid-cols-1 gap-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.name} className="flex flex-col-reverse">
                                <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
                                <dd className="text-2xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}