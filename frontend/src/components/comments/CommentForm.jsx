import React, { useState } from 'react';

const CommentForm = ({ onAddComment }) => {
 /*  const { postId } = useParams(); */
  const [description, setDescription] = useState('');

  const handleAddComment = () => {
    // Validación simple
    if (!description.trim()) {
      alert('Please enter a comment.');
      return;
    }

    // Llamada a la función del padre para agregar el comentario
    onAddComment(description);

    // Limpiar el campo de descripción después de agregar el comentario
    setDescription('');
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Add Comment</h2>
      <textarea
        rows="3"
        placeholder="Enter your comment..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded-md"
      ></textarea>
      <button onClick={handleAddComment} className="mt-2 bg-blue-500 text-white p-2 rounded-md">
        Add Comment
      </button>
    </div>
  );
};

export default CommentForm;
