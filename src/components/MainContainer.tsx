import React from 'react';
import { Routes, Route } from "react-router-dom";

import PreviewsContainer from '../components/PreviewsContainer';
import Post from '../components/Post';
import LogInForm from './LogInForm';

function MainContainer(): JSX.Element{
  return (
    <main>
        <Routes>
          <Route path="/" element={<PreviewsContainer />} />
          <Route path="/posts/:id" element={<Post/>} />
          <Route path="/log-in" element={<LogInForm/>} />
        </Routes> 
    </main>
  );
}

export default MainContainer