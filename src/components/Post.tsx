import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import AddComment from './AddComment';
import {  selectUser } from '../store/userSlice';
import { getPost } from '../API/posts';
import gear from '../assets/gear.gif';


function Post(): JSX.Element{
  // get post id from url params
  const { id } = useParams();
  const [post, setPost] = useState<IPost>();

  const user = useSelector(selectUser);

  useEffect(() => {
    // get post from server and render it
    getPost(id as string)
      .then((fetchedPost) => {
        setPost(fetchedPost.post)
      })
      .catch((err) => console.log(err));
  }, []);

  // reload post when updating comment
  function reload(newPost: IPost, formRef?: MutableRefObject<null | HTMLFormElement>): void{
    setPost(newPost);
    if(formRef !== undefined) {
      formRef.current?.scrollIntoView({ behavior: 'smooth'});
    }
  }

  return post !== undefined ? (
    <article className="post">
      <h1>{post.title}</h1>
      <p className="poster">
        By{" "}
        <em>{typeof post.poster !== "string" ? post.poster.username : null}</em>
      </p>
      <p className="date">
        {format(new Date(post.createdAt as string), "d MMM yyyy")}
      </p>
      <p className="content">{post.content}</p>
      {/* render comments if there are any */}
      <h2>Comments:</h2>
      {post.comments.length > 0 ? (
        post.comments.map((comment: IComment, i) => (
          <Comment
            key={i}
            id={comment._id as string}
            postId={id as string}
            commenter={
              typeof comment.commenter !== "string"
                ? comment.commenter.username
                : ""
            }
            content={comment.content}
            createdAt={comment.createdAt as string}
            user={user}
            reload={reload}
          />
        ))
      ) : (
        <p>No comments yet!</p>
      )}
      {/* only render add comment if user is signed in */}
      {user !== null ? (
        <AddComment postId={id as string} user={user} reload={reload} />
      ) : null}
    </article>
  ) : (
    <>
      <h1>Loading post</h1>
      <img src={gear} alt="" />
    </>
  );
}

export default Post;
