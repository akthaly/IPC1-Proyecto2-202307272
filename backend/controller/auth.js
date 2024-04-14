import {users} from '../data/dataLists.js' //se importa el arreglo de usuarios que se encuentra en el archivo dataLists.js

//estamos creando la funcionalidad para el servidor, en este caso la autenticacion de un usuario


export const login = (req, res) => {  //se crea la funcion login que recibe dos parametros, request (lo que nos esta enviando el cliente), response (lo que le vamos a responder al cliente)
    const {password, carnet} = req.body; 
    //esto es de js, se crea una constante que se llama email y password, y se le asigna el valor del objeto req.body, que es lo que nos envia el cliente
    /*podemos hacer lo anterior de una forma más larga, por ejemplo:
    const email = req.body.email;
    const password = req.body.password;
    esto es lo mismo que lo anterior, pero en dos lineas de codigo, la primera forma es más corta y limpia
    */
    const user = users.find(user => user.carnet ===carnet && user.password === password);
    //se crea una constante que se llama user, y se le asigna el valor de la busqueda del usuario en el arreglo de usuarios, se busca el usuario que tenga el mismo correo y contraseña que el que se envio en el formulario

    if (!user) {
        return res.status(401).json({ message: "Usuario no encontrado"}); 
        //si no se encuentra el usuario, se responde con un status 401 (no autorizado) y un mensaje de que el usuario no se encontro
    }

    return res.status(200).json({message: "Usuario encontrado"});
    //si se encuentra el usuario, se responde con un status 200 (ok) (ver la pagina http.cat, ahí estan todos los status) y un mensaje de que el usuario se encontro y se envia el usuario

}

export const getAllUsers = (req, res) => {

    try{
        return res.status(200).json({usuario: users});
    }catch(error){
        return res.status(500).json({message: error.message});
}
}

export const register = (req, res) => {
    const {email, password, carnet, nombre, apellido, genero, facultad, carrera} = req.body; //se crea una constante que se llama carnet y password, y se le asigna el valor del objeto req.body, que es lo que nos envia el cliente

    const user = users.find(user => user.email === email && user.carnet === carnet);
    if (user) {
        return res.status(409).json({ message: "Usuario ya existe"});
        //si se encuentra el usuario, se responde con un status 409 (conflicto) y un mensaje de que el usuario ya existe
    }
    users.push({email, password, carnet, nombre, apellido, genero, facultad, carrera});
    return res.status(201).json({ message: "Usuario creado"});
    //si se encuentra el usuario, se responde con un status 201 (creado) y un mensaje de que el usuario se creo
}