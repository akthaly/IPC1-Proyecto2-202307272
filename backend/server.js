import express from 'express';
//para ejecutar un archivo de node se usa el comando node server.js
import bodyParser from 'body-parser'; //importa el modulo de body-parser para poder leer los datos que se envian desde el cliente
import authRoutes from './routes/routes.js'; //importa las rutas de autenticacion
import cors from 'cors'; //importa el modulo de cors para poder hacer peticiones desde el frontend

const app = express(); //creamos nuestra aplicacion de express

app.use(bodyParser.json( {limit: '15mb'})); //Middleware bodyParser, para poder leer los datos que se envian desde el cliente y le pone un limite de 15mb, esto es para la imagen

app.use(cors( 
    //podemos elegir la ip de la cual permitir las peticiones, en este caso se permite desde cualquier ip

)); //Middleware cors, para poder hacer peticiones desde el frontend

app.use('/api', authRoutes); //vamos a hacerle peticiones a http://localhost:5000/api/ruta

const PORT = 5000; /*se crea una constante que se llama PORT, 
es el puerto donde se va a ejecutar el servidor, no puede ser el mismo puerto que el de react*/


app.listen(PORT, () => { //se ejecuta el servidor en el puerto que se le asigno
    console.log(`Server is running on port ${PORT}`); //imprime en consola un mensaje de que el servidor esta corriendo
});

