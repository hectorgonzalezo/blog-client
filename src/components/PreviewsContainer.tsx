import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import PostPreview from "./PostPreview";
import { getPosts } from "../API/posts";
import gear from "../assets/gear.gif";

function PreviewsContainer(): JSX.Element {
  const [posts, setPosts] = useState<IPost[]>([]);

  const user = useSelector(selectUser);

  function reload(): void {
    // Get all posts in database
    // add them to state if found
    getPosts()
      .then((fetchedPosts) => {
        setPosts(fetchedPosts.posts);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    reload();
  }, []);

  return posts.length > 0 ? (
    <div className="previews-container">
      {posts.map((post, i) => (
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
      ))}
    </div>
  ) : (
    <>
      <h1>Loading posts</h1>
      <img src={gear} alt="" />
    </>
  );
}

export default PreviewsContainer;
