import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import { format } from 'date-fns';
import { getPost } from '../API/posts';
import { useParams } from 'react-router-dom';


function Post(): JSX.Element{
  // get post id from url params
  const { id } = useParams();
  const [post, setPost] = useState<IPost>();

  useEffect(() => {
    // get post from server and render it
    getPost(id as string)
      .then((post) => {
        setPost(post.post)
        console.log(post.post)
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <article className="post">
      {post !== undefined ? (
        <>
          <h1>{post.title}</h1>
          <p className='poster'>{post.poster}</p>
          <p className='date'>{format(new Date(post.createdAt), "d MMM yyyy")}</p>
          <p className='content'>{post.content}</p>
          {/* render comments if there are any */}
          <h2>Comments:</h2>
          {
          post.comments.length > 0
          ? post.comments.map(
            (comment: IComment, i) => {
                return (
                  <Comment
                    key={i}
                    commenter={comment.commenter.username}
                    content={comment.content}
                    createdAt={comment.createdAt}
                  />
                );
            })
          : <p>No comments yet!</p>
          }
        </>
      ) : null}
    </article>
  );
}

export default Post
