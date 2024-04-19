import { list_users } from "../data/dataLists.js";

export const updateUser = (req, res) => {
    try {
        const { email, password, carnet, nombre, apellido, genero, facultad, carrera } = req.body;
        const user = list_users.find(user => user.carnet === carnet); //se busca el usuario por el carnet
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        const usuarioActualizado = user   //a esta variable se le asigna el usuario que se va a actualizar

        usuarioActualizado.email = email;
        usuarioActualizado.password = password;
        usuarioActualizado.nombre = nombre;
        usuarioActualizado.apellido = apellido;
        usuarioActualizado.genero = genero;
        usuarioActualizado.facultad = facultad;
        usuarioActualizado.carrera = carrera;

        return res.status(200).json({ message: "Usuario actualizado", usuarioActualizado });
        

        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}