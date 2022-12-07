import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {  selectUser } from '../store/userSlice';
import BlogPreview from './BlogPreview';
import { getPosts } from '../API/posts';


function PreviewsContainer(): JSX.Element{
  const [posts, setPosts]= useState<IPost[]>([]);

  const user = useSelector(selectUser);
  useEffect(() => {
    // Get all posts in database
    // add them to state if found
    getPosts()
      .then((fetchedPosts) => {
        setPosts(fetchedPosts.posts)
      })
      .catch((error) => console.log(error));
  }, []);
  
  return (
    <div className='previews-container'>
      {posts.length > 0
        ? posts.map((post, i) => (
            <BlogPreview
              title={post.title}
              published={post.published}
              createdAt={post.createdAt as string}
              id={post._id as string}
              key={i}
            />
          ))
        : null}
    </div>
  );
}

export default PreviewsContainer