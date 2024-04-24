import { list_users, list_posts } from '../data/dataLists.js' //se importa el arreglo de usuarios que se encuentra en el archivo dataLists.js

export const deleteUser = (req, res) => {  //se crea la funcion login que recibe dos parametros, request (lo que nos esta enviando el cliente), response (lo que le vamos a responder al cliente)

    const { carnet } = req.body;
    const user = list_users.find(user => user.carnet === carnet); //se busca el usuario por el carnet
    if (!user) {
        return res.status(404).json({ message: "el usuario no existe" });
    } list_users.splice(list_users.indexOf(user), 1); // este codigo elimina el usuario del arreglo de usuarios
    return res.status(200).json({ message: "Usuario eliminado" });
}

export const deletePost = (req, res) => {
    const { id } = req.body;
    const post = list_posts.find(post => post.id === id);
    if (!post) {
        return res.status(404).json({ message: "el post no existe" });
    }
    list_posts.splice(list_posts.indexOf(post), 1);
    return res.status(200).json({ message: "Post eliminado" });
};

