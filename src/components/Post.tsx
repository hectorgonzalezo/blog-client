import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import Comment from './Comment';
import AddComment from './AddComment';
import { useSelector } from 'react-redux';
import {  selectUser } from '../store/userSlice';
import { format } from 'date-fns';
import { getPost } from '../API/posts';
import { useParams } from 'react-router-dom';


function Post(): JSX.Element{
  // get post id from url params
  const { id } = useParams();
  const [post, setPost] = useState<IPost>();
  const user = useSelector(selectUser);

  useEffect(() => {
    // get post from server and render it
    getPost(id as string)
      .then((post) => {
        setPost(post.post)
      })
      .catch((err) => console.log(err));
  }, []);

  // reload post when updating comment
  function reload(post: IPost, formRef: MutableRefObject<null | HTMLFormElement>): void{
    setPost(post);
    formRef.current?.scrollIntoView({ behavior: 'smooth'});
  }

  return (
    <article className="post">
      {post !== undefined ? (
        <>
          <h1>{post.title}</h1>
          <p className='poster'>{typeof post.poster !== 'string' ? post.poster.username: null}</p>
          <p className='date'>{format(new Date(post.createdAt as string), "d MMM yyyy")}</p>
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
                    id={comment._id as string}
                    commenter={typeof comment.commenter !== 'string' ? comment.commenter.username : ''}
                    content={comment.content}
                    createdAt={comment.createdAt as string}
                  />
                );
            })
          : <p>No comments yet!</p>
          }
          {/* only render add comment if user is signed in */}
          {user !== null ? <AddComment postId={id as string} user={user} reload={reload} /> : null}
        </>
      ) : null}
    </article>
  );
}

export default Post
