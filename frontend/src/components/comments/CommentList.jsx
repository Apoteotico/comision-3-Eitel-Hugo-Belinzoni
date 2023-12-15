// CommentList.jsx
import React from 'react';

const CommentList = ({ comments }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Comments</h2>
      {comments.map((comment) => (
        <div key={comment._id} className="mb-2">
          <strong>{comment.autor.username}:</strong> {comment.description}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
