import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/headerStyle.scss';

function Header(): JSX.Element  {
  return (
    <header>
      <Link to="/">
        <h1>My Blog</h1>
      </Link>
      <Link to="/log-in" className="button">
        Log In
      </Link>
      <Link to="/sign-up" className="button">
        Sign up
      </Link>
    </header>
  );
}

export default Header
