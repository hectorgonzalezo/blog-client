import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './API/posts';
import { addUser, selectUser } from './store/userSlice';
import './styles/app.scss';

function App(): JSX.Element {
  const [posts, setPosts]= useState<IPost[]>([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // Get all posts in database
    // add them to state if found
    getPosts()
      .then((fetchedPosts) => {
        setPosts(fetchedPosts.posts)
      })
      .catch((error) => console.log(error));
    console.log(user)
    dispatch(addUser({ username: 'asdfasd', email: "123423@asdfasd.com", permission: "regular"}))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Blog</h1>
        <button onClick={() => console.log(user)}>Show User</button>
        {posts.length > 0
          ? posts.map((post) => <h1 key={post.title}> {post.title} </h1>)
          : null}
      </header>
    </div>
  );
}

export default App;
