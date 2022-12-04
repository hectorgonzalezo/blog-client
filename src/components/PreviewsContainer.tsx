import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, selectUser } from '../store/userSlice';
import BlogPreview from './BlogPreview';
import { getPosts } from '../API/posts';


function PreviewsContainer(): JSX.Element{
  const [posts, setPosts]= useState<IPost[]>([]);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    // Get all posts in database
    // add them to state if found
    getPosts()
      .then((fetchedPosts) => {
        setPosts(fetchedPosts.posts)
        console.log(fetchedPosts.posts)
      })
      .catch((error) => console.log(error));
    dispatch(addUser({ username: 'asdfasd', email: "123423@asdfasd.com", permission: "regular"}))
  }, [])
  return (
    <div className='previews-container'>
      {posts.length > 0
        ? posts.map((post, i) => (
            <BlogPreview
              title={post.title}
              published={post.published}
              createdAt={post.createdAt}
              id={post._id}
              key={i}
            />
          ))
        : null}
    </div>
  );
}

export default PreviewsContainer