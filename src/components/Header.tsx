import React from 'react';
import '../styles/headerStyle.scss';

function Header(): JSX.Element  {
  return (
    <header>
      <h1>My Blog</h1>
      <button>Sign Up</button>
      <button>Log In</button>
    </header>
  );
}

export default Header
