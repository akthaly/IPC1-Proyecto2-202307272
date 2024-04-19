let list_users = [{

    //este es un array

    email: "ipc11s2024@email.com",
    password: "@adminIPC1",
    carnet: "12024",
    nombre: "Rodrigo",
    apellido: "Porón",
    genero: "Masculino",
    facultad: "Ingenieria",
    carrera: "Ingenieria en Ciencias y Sistemas",

}]

let list_posts = [{ //arreglo de posts
    anonimo: Boolean, //si el post es anonimo o no
    id:[], //id del post  (autoincremental)
    carnet:[], //id del usuario que creo el post
    descripcion:[], //descripcion del post
    imagen:[], //imagen del post
    fechaHora: [], //fecha y hora de creacion del post
}]

export { list_users, list_posts }; //exporta el arreglo de usuarios para poder usarlo en otros archivos