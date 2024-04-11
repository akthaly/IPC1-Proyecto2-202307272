import express from 'express';
import { login} from '../controller/auth.js'; //importa la funcion login del archivo auth.js de la carpeta controller

const router = express.Router(); //se crea un router de express
/*aqui administramos las rutas de la aplicacion, en este caso la ruta de login con https methods, 
ver la pagina de internet https://developer.mozilla.org/es/docs/Web/HTTP/Methods */

router.post('/login', login); 

/*login es para especificar la ruta hacia donde queremos mandar los datos del 
formulario, en este caso a la ruta de login, y login es la funcion que se va a ejecutar cuando se envie el 
formulario la que creamos en el archivo auth.js del controlador*/

export default router; //exporta el router para poder usarlo en otros archivos