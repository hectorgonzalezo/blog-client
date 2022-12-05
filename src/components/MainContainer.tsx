import React from 'react';
import { Routes, Route } from "react-router-dom";
import PreviewsContainer from '../components/PreviewsContainer';
import Post from '../components/Post';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';

function MainContainer(): JSX.Element{
  return (
    <main>
        <Routes>
          <Route path="/" element={<PreviewsContainer />} />
          <Route path="/posts/:id" element={<Post/>} />
          <Route path="/log-in" element={<LogInForm/>} />
          <Route path="/sign-up" element={<SignUpForm/>} />
        </Routes> 
    </main>
  );
}

export default MainContainer