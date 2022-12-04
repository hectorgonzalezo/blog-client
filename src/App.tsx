import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './API/posts';
import { addUser, selectUser } from './store/userSlice';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/app.scss';
import './styles/mainStyle.scss';

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
    dispatch(addUser({ username: 'asdfasd', email: "123423@asdfasd.com", permission: "regular"}))
  }, [])

  return (
    <div className="App">
      <Header/>
      <main>
      {posts.length > 0
          ? posts.map((post) => <h1 key={post.title}> {post.title} </h1>)
          : null}
      </main>
      <Footer projectName='blog_client'/>
    </div>
  );
}

export default App;
