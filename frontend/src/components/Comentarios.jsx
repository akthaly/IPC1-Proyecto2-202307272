import React, { useState, useEffect } from 'react';

export default function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    // Obtener comentarios del post
    useEffect(() => {
        fetch(`/api/posts/${postId}/comments`)
            .then(response => response.json())
            .then(data => setComments(data.comentarios))
            .catch(error => console.error('Error fetching comments:', error));
    }, [postId]);

    // Manejar el envío de un nuevo comentario
    const handleSubmit = (event) => {
        event.preventDefault();

        const commentData = {
            postId,
            comentario: newComment,
        };

        fetch(`/api/posts/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData),
        })
            .then(response => response.json())
            .then(data => {
                // Añadir el nuevo comentario a la lista
                setComments([...comments, data.newComment]);
                // Limpiar el campo de entrada
                setNewComment('');
            })
            .catch(error => console.error('Error posting comment:', error));
    };

    return (
        <div>
            <h3 className="text-xl font-bold mb-2">Comentarios</h3>
            <div className="space-y-2">
                {comments.map(comment => (
                    <div key={comment.id} className="bg-gray-200 p-2 rounded">
                        <span className="text-gray-500 text-sm">{new Date(comment.fechaHora).toLocaleString()}</span>
                        <p className="mt-1">{comment.comentario}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
                <textarea
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Escribe un comentario..."
                    required
                ></textarea>
                <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">Enviar</button>
            </form>
        </div>
    );
}


