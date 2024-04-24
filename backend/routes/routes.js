import express from 'express';
import { login, register, getAllUsers} from '../controller/auth.js'; //importa la funcion login del archivo auth.js de la carpeta controller
import { createPost, getPosts, addComment, Like } from '../controller/posts.js';  //importa la funcion createPost del archivo posts.js de la carpeta controller
import { updateUser } from '../controller/update.js'; //importa la funcion updateUser del archivo update.js de la carpeta controller
import { deleteUser, deletePost} from '../controller/delete.js';

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

router.post('/addComment', addComment);

router.post('/Like', Like);


//Get

router.get('/getPosts', getPosts); //ruta para obtener los posts

router.get('/getAllUsers', getAllUsers); //ruta para obtener todos los usuarios


//Put
router.put('/update', updateUser); //ruta para actualizar un usuario

//Delete

router.delete('/deleteUser', deleteUser); //ruta para eliminar un usuario
router.delete('/deletePost', deletePost);




export default router; //exporta el router para poder usarlo en otros archivos