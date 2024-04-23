var idComment = 0; // Variable para llevar la cuenta de los comentarios

export const createComment = (req, res) => {
    try {
        const { postId, carnet, comentario } = req.body;
        
        if (!postId || !comentario) {
            return res.status(400).json({ mensaje: "Datos incompletos" });
        }
        
        idComment += 1;
        
        const newComment = {
            id: idComment,
            postId: postId,
            carnet: carnet || null,
            comentario: comentario,
            fechaHora: new Date(),
        };

        list_comments.push(newComment);
        return res.status(201).json({ mensaje: "Comentario creado exitosamente", newComment });
    } catch (error) {
        console.error("Error creando comentario:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

export const getComments = (req, res) => {
    const { postId } = req.params;
    // Obtén los comentarios para el post con id `postId`
    const postComments = list_comments.filter(comment => comment.postId == postId);
    // Devuelve los comentarios como JSON
    res.json({ comentarios: postComments });
};
