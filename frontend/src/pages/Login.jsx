import React, { useState } from "react";
import { Button } from '@nextui-org/react'
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        alert("Error en la petición");
        throw new Error("Error en la petición");
      }

      const data = await response.json();
      alert("Inicio de sesión exitoso");
      console.log({ data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main >
      <div className="h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex gap-8 justify-center items-center"
      >
        <div className="h-screen flex flex-1 flex-col justify-center px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Link to="/">
            <img
              className="mx-auto h-48 w-auto"
              src="img/LOGO.png"
              alt="LOGO USocial"
            />
            </Link>
            <h1 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Inicia Sesión
            </h1>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Número de Carnet/Código USAC
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    label="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    placeholder=" correo@example.com / 2023XXXXX"
                    style={{ paddingLeft: '10px' }}
                    required
                    className=" block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Contraseña
                  </label>
                  <div className="text-sm">
                    <Link
                      to="/forgot-password" // Uso de Link en lugar de a
                      className="font-semibold text-indigo-400 hover:text-indigo-300"
                    >
                      Olvidaste la contraseña?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    type="password"
                    label="password"
                    name="password"
                    style={{ paddingLeft: '10px' }}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  color="primary"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Inicia sesión
                </Button>
              </div>
            </div>

            <p className="mt-10 text-center text-sm text-gray-500">
              Aún no tienes cuenta?{" "}
              <Link
                to="/register" // Uso de Link en lugar de a
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Registrate acá
              </Link>
            </p>
          </div>
        </div>
      </form>
      </div>
    </main>
  );
}
