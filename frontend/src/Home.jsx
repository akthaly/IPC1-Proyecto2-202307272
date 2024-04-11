import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@nextui-org/react'



export default function Home() {

  return (
    <div>
            <div className="flex justify-center items-center h-screen bg-gray-800">
                <div className="w-2/3 relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                    <svg
                        viewBox="0 0 1024 1024"
                        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                        aria-hidden="true"
                    >
                        <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                        <defs>
                            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                                <stop stopColor="#7775D6" />
                                <stop offset={1} stopColor="#E935C1" />
                            </radialGradient>
                        </defs>
                    </svg>
                    <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                        <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            USocial - USAC.
                            <br />
                            ¡Registrate ahora mismo!
                        </h2>
                        <p className="text-center mt-6 text-lg leading-8 text-gray-300">
                            La nueva red social de la univesidad de San Carlos de Guatemala.

                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                            <a
                                href="/login"
                                className=" rounded-md bg-violet-950 px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Inicia Sesión
                            </a>
                            <a href="/register" className="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Registrate
                            </a>
                            <Link to = "/info" className="text-sm font-semibold leading-6 text-white">
                                Más información <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                    <div className="relative mt-16 h-80 lg:mt-8 left-10 top-12">
                        <img
                            className="w-full h-auto max-w-full max-h-full rounded-md bg-white/5 ring-1 ring-white/10"
                            src="img\LOGO.png"
                            alt="LOGO USocial"
                            width={1824}
                            height={1080}
                        />
                    </div>
                </div>
            </div>
        </div>
  );
}
