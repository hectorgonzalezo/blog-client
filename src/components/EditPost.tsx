import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../API/posts';
import gear from "../assets/gear.gif";
import CreatePost from './CreatePost';

function EditPost(): JSX.Element {
  const { id } = useParams();
  const [postData, setPostData] = useState<IPost | null >(null);

  // Get post data from database on render
  useEffect(() => {
    getPost(id as string)
      .then((post) => setPostData(post.post))
      .catch((err) => console.log(err));
  });

  // Show create post, with data from previous post
  return postData !== null && typeof postData.poster !== 'string' ? (
    <CreatePost
      editUser={postData.poster._id}
      editId={id}
      edit
      editTitle={postData.title}
      editContent={postData.content}
      editPublished={postData.published}
      editComments={postData.comments}
    />
  ) : (
    <>
      <h1>Loading post data</h1>
      <img src={gear} alt="" />
    </>
  );
}

export default EditPost;
