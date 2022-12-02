import React, { useState, useEffect } from 'react';
import { getPosts } from './API/posts';
import { getComment} from './API/comments';
import './styles/app.scss';

function App(): JSX.Element {
  const [posts, setPosts]= useState<IPost[]>([]);

  useEffect(() => {
    // Get all posts in database
    // add them to state if found
    getPosts()
      .then((fetchedPosts) => {
        setPosts(fetchedPosts.posts)
      })
      .catch((error) => console.log(error));
    getComment("6388d8e56cca4a87e685f5aa", "6388ddeb4149e1b0c40d7885")
      .then((fetchedPosts) => {
        console.log(fetchedPosts)
      })
      .catch((error) => console.log(error));
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Blog</h1>
        {posts.length > 0
          ? posts.map((post) => <h1 key={post.title}> {post.title} </h1>)
          : null}
      </header>
    </div>
  );
}

export default App;
