import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPosts, addPosts } from "../store/postsSlice";
import { selectUser } from "../store/userSlice";
import PostPreview from "./PostPreview";
import { getPosts } from "../API/posts";
import gear from "../assets/gear.gif";

function PreviewsContainer(): JSX.Element {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  function reload(): void {
    // Get all posts in database
    // add them to state if found
    getPosts()
      .then((fetchedPosts) => {
        dispatch(addPosts(fetchedPosts.posts));
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    if(posts.length === 0) {
      reload();
    }
  }, []);

  return posts.length > 0 ? (
    <div className="previews-container">
      {posts.map((post, i) => {
        if(post.published || user?.permission === 'admin') {
         return (
         <PostPreview
          title={post.title}
          published={post.published}
          createdAt={post.createdAt as string}
          id={post._id as string}
          poster={typeof post.poster !== "string" ? post.poster.username : ""}
          user={user as IUser}
          reload={reload}
          key={i}
        />
         )
        }
})}
    </div>
  ) : (
    <>
      <h1>Loading data from sever - May take a while</h1>
      <img src={gear} alt="" className="loading_gear"/>
    </>
  );
}

export default PreviewsContainer;
