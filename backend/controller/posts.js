import {posts} from '../data/dataLists.js'  //importa el arreglo de posts del archivo dataLists.js de la carpeta data

// Description: Aquí se definen las funciones que se ejecutarán cuando se haga una petición a la API. En este caso, se definen las funciones para crear un post y obtener los posts.

var idPost = 0; //id del post

export const createPost = (req, res) => { //se crea la funcion createPost que recibe dos parametros, request (lo que nos esta enviando el cliente), response (lo que le vamos a responder al cliente)
    const {anonimo, carnet, descripcion, imagen, comentarios} = req.body; //se crea una constante que se llama carnet, descripcion e imagen, y se le asigna el valor del objeto req.body, que es lo que nos envia el cliente
    /* asi se puede hacer de una forma más larga:
    const carnet = req.body.carnet
    const descripcion = req.body.descripcion
    const imagen = req.body.imagen*/

    idPost = idPost + 1; //se incrementa el id del post

    if (!carnet || !descripcion || !imagen || !comentarios) { //si no se envian los datos necesarios
        return res.status(400).json({ mensaje: "Datos incompletos" }); //se responde con un status 400 (bad request) y un mensaje de que los datos estan incompletos
    }
    const post = { //se crea un objeto post
        anonimo: anonimo, //se le asigna si el post es anonimo o no
        id: idPost, //se le asigna el id del post
        carnet: carnet, //se le asigna el carnet del usuario
        descripcion: descripcion, //se le asigna la descripcion
        imagen: imagen, //se le asigna la imagen
        fechahora: new Date(), //se le asigna la fecha y hora actual
        comentarios: comentarios //se le asigna un arreglo de comentarios vacio
    }
    posts.push(post); //se agrega el post al arreglo de posts
    return res.status(201).json({ mensaje: "Post creado exitosamente", post }); //se responde con un status 201 (creado) y un mensaje de que el post se creo exitosamente

}

export const getPosts = (req, res) => { //se crea la funcion getPosts que recibe dos parametros, request (lo que nos esta enviando el cliente), response (lo que le vamos a responder al cliente)
    const publicacionVisibles = posts.map(post => { //se crea una constante que se llama publicacionVisibles, y se le asigna el valor de un mapeo del arreglo de posts
        if (post.anonimo === true) { //si el post no es anonimo
            const {anonimo, descripcion, imagen, comentarios} = post; //se crea una constante que se llama anonimo, descripcion e imagen, y se le asigna el valor del objeto post
            return post //se crea una constante que se llama descripcion e imagen, y se le asigna el valor del objeto post
        } else { //si el post es anonimo
            return post //se crea una constante que se llama descripcion e imagen, y se le asigna el valor del objeto post
        }

    })

    publicacionVisibles.get(publicacionVisibles); //se responde con un status 200 (ok) y se envia el arreglo de posts
    return res.status(200).json({ publicacionVisibles });

}


