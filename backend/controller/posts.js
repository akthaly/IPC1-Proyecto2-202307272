import {list_users, list_posts} from '../data/dataLists.js'  //importa el arreglo de posts del archivo dataLists.js de la carpeta data

// Description: Aquí se definen las funciones que se ejecutarán cuando se haga una petición a la API. En este caso, se definen las funciones para crear un post y obtener los posts.

var idPost = 0; //id del post de tipo var o let para que pueda cambiar su valor

export const createPost = (req, res) => { //se crea la funcion createPost que recibe dos parametros, request (lo que nos esta enviando el cliente), response (lo que le vamos a responder al cliente)
    const {anonimo, carnet, descripcion, imagen, nombre, apellido, carrera, facultad, categoria} = req.body; //se crea una constante que se llama carnet, descripcion e imagen, y se le asigna el valor del objeto req.body, que es lo que nos envia el cliente
    /* asi se puede hacer de una forma más larga:
    const carnet = req.body.carnet
    const descripcion = req.body.descripcion
    const imagen = req.body.imagen*/

    idPost = idPost + 1; //se incrementa el id del post

    if (!carnet || !descripcion) { //si no se envian los datos necesarios
        return res.status(400).json({ mensaje: "Datos incompletos" }); //se responde con un status 400 (bad request) y un mensaje de que los datos estan incompletos
    }
    const post = { //se crea un objeto post
        id: idPost, //se le asigna el id del post
        anonimo: anonimo, //se le asigna si el post es anonimo o no
        nombre: nombre, //se le asigna el nombre del usuario
        apellido: apellido, //se le asigna el apellido del usuario
        carnet: carnet, //se le asigna el carnet del usuario
        carrera: carrera, //se le asigna la carrera del usuario
        facultad: facultad, //se le asigna la facultad del usuario
        categoria: categoria, //se le asigna la categoria del post
        descripcion: descripcion, //se le asigna la descripcion
        imagen: imagen, //se le asigna la imagen
        fechaHora: new Date(), //se le asigna la fecha y hora actual
        likes:[], //se crea un arreglo de likes
    }
    list_posts.push(post); //se agrega el post al arreglo de posts
    return res.status(201).json({ mensaje: "Post creado exitosamente", post }); //se responde con un status 201 (creado) y un mensaje de que el post se creo exitosamente

}

export const getPosts = (req, res) => {
   try {
        return res.status(200).json({ publicaciones: list_posts }); //se responde con un status 200 (ok) y se envia el arreglo de posts
    
   } catch (error) {
         return res.status(500).json({ mensaje: error.message });
    
   }
}



