import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface CommentProps {
  commenter: string;
  content: string;
  createdAt: string;
}

function Comment({ commenter, content, createdAt }: CommentProps): JSX.Element{
  // get comment id from url params
  const [comment, setComment] = useState<IComment>();
  return(
    <div className='comment'>
      <h1>{commenter}</h1>
      <p className='date'>{format(new Date(createdAt), "d MMM yyyy")}</p>
      <p className='content'>{content}</p>
    </div>
  )
}

export default Comment
