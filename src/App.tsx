import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContainer from './components/MainContainer';

import './styles/app.scss';
import './styles/mainStyle.scss';

function App(): JSX.Element {


  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <MainContainer/>
        <Footer projectName='blog_client'/>
      </BrowserRouter>
    </div>
  );
}

export default App;
