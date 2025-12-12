// react-router-advanced/src/pages/PostDetail.jsx

import React from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  // Grabs the dynamic part of the URL, e.g., '123' from /posts/123
  const { postId } = useParams();

  return (
    <div className="p-4">
      <h2>Dynamic Post Detail</h2>
      <p>Displaying content for Post ID: <strong>{postId}</strong></p>
      <p>This demonstrates dynamic routing.</p>
    </div>
  );
};

export default PostDetail;