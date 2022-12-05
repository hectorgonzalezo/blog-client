import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeUser, selectUser } from '../store/userSlice';
import userIcon from '../assets/userIcon.png';
import '../styles/headerStyle.scss';

function Header(): JSX.Element  {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  function logOut(): void {
    // remove user from store;
    dispatch(removeUser())
  }

  return (
    <header>
      <Link to="/">
        <h1>My Blog</h1>
      </Link>
      {user === null ? (
        <>
          <Link to="/log-in" className="button">
            Log In
          </Link>
          <Link to="/sign-up" className="button">
            Sign up
          </Link>
        </>
      ) : 
      <>
        <div className='user_display'><img src={userIcon} alt="" className='icon'/>{user.username}</div>
        <button className='button' onClick={logOut}>Log Out</button>
      </>
      }
    </header>
  );
}

export default Header
