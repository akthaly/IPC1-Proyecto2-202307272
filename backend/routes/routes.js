import express from 'express';
import { login, register, getAllUsers} from '../controller/auth.js'; //importa la funcion login del archivo auth.js de la carpeta controller
import { createPost, getPosts } from '../controller/posts.js';  //importa la funcion createPost del archivo posts.js de la carpeta controller
import { updateUser } from '../controller/update.js'; //importa la funcion updateUser del archivo update.js de la carpeta controller
import { deleteUser } from '../controller/delete.js';
import {createComment, getComments} from '../controller/comments.js'; //importa la funcion createComment del archivo comments.js de la carpeta controller

const router = express.Router(); //se crea un router de express
/*aqui administramos las rutas de la aplicacion, en este caso la ruta de login con https methods, 
ver la pagina de internet https://developer.mozilla.org/es/docs/Web/HTTP/Methods */

//Post 

router.post('/login', login); 

/* /login es para especificar la ruta hacia donde queremos mandar los datos del 
formulario, en este caso a la ruta de login, y login es la funcion que se va a ejecutar cuando se envie el 
formulario la que creamos en el archivo auth.js del controlador*/

router.post('/register', register); //ruta para registrar un usuario

router.post('/createPost', createPost); //ruta para crear un post

router.post('/comments', createComment); //ruta para crear un comentario

//Get

router.get('/getPosts', getPosts); //ruta para obtener los posts

router.get('/getAllUsers', getAllUsers); //ruta para obtener todos los usuarios

router.get('posts/comments', getComments); //ruta para obtener los comentarios de un post

//Put
router.put('/update', updateUser); //ruta para actualizar un usuario

//Delete

router.delete('/delete', deleteUser); //ruta para eliminar un usuario


export default router; //exporta el router para poder usarlo en otros archivos