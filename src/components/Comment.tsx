import React from 'react';
import { format } from 'date-fns';

interface CommentProps {
  id: string;
  commenter: string;
  content: string;
  createdAt: string;
}

function Comment({ id, commenter, content, createdAt }: CommentProps): JSX.Element{
  return(
    <div className='comment' id={id}>
      <h1>{commenter}</h1>
      <p className='date'>{format(new Date(createdAt), "d MMM yyyy")}</p>
      <p className='content'>{content}</p>
    </div>
  )
}

export default Comment
