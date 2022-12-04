import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './API/posts';
import { addUser, selectUser } from './store/userSlice';
import Header from './components/Header';
import Footer from './components/Footer';
import PreviewsContainer from './components/PreviewsContainer';
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
        console.log(fetchedPosts.posts)
      })
      .catch((error) => console.log(error));
    dispatch(addUser({ username: 'asdfasd', email: "123423@asdfasd.com", permission: "regular"}))
  }, [])

  return (
    <div className="App">
      <Header/>
      <main>
        <PreviewsContainer posts={posts} />
      </main>
      <Footer projectName='blog_client'/>
    </div>
  );
}

export default App;
