import { users } from '../data/dataLists.js' //se importa el arreglo de usuarios que se encuentra en el archivo dataLists.js

export const deleteUser = (req, res) => {  //se crea la funcion login que recibe dos parametros, request (lo que nos esta enviando el cliente), response (lo que le vamos a responder al cliente)

    const { carnet } = req.body;
    const user = users.find(user => user.carnet === carnet); //se busca el usuario por el carnet
    if (!user) {
        return res.status(404).json({ message: "el usuario no existe" });
    } users.splice(users.indexOf(user), 1); // este codigo elimina el usuario del arreglo de usuarios
    res.status(200).json({ message: "Usuario eliminado" });



    return res.status(200).json({ message: "Usuario Eliminado", usuarioEliminado });

}