import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import PreviewsContainer from "./PreviewsContainer";
import Post from "./Post";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";
import CreatePost from "./CreatePost";

function MainContainer(): JSX.Element {
  const user = useSelector(selectUser);

  return (
    <main>
      <Routes>
        <Route path="/" element={<PreviewsContainer />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/log-in" element={<LogInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route
          path="/create-post"
          element={
            user?.permission === "admin" ? (
              <CreatePost />
            ) : (
              <PreviewsContainer />
            )
          }
        />
      </Routes>
    </main>
  );
}

export default MainContainer;
