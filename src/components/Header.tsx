import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/headerStyle.scss';

function Header(): JSX.Element  {
  return (
    <header>
      <Link to="/">
        <h1>My Blog</h1>
      </Link>
      <button>Sign Up</button>
      <button>Log In</button>
    </header>
  );
}

export default Header
