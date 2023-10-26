import React, { useState } from 'react';
import axios from 'axios'; 

const Comment = ({ addCommentToList }) => {
  const [user, setUser] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/comments/save`, {
        user: user,
        comment: comment,
      })
      .then(response => {
        addCommentToList(response.data)
      })
      .catch(err => {
        console.log("Error posting data:", err)
      })

      setUser('');
      setComment('');
  }

  return (
    <form className="CommentForm" onSubmit={handleSubmit} method="post" enctype="multipart/form-data">
        <div class="input-group">
          <label for="comment">Add Comment: </label><br/>
          <textarea id="song-comment" value={comment} name="song-comment" onChange={(e) => setComment(e.target.value)} placeholder="Enter a comment" rows="10"></textarea>
        </div>
        <br/>
    
        <div class="button">
          <input type="submit" disabled={!comment} value="Enter"/>
        </div>
    </form>
  );
};

export default Comment;