import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser, selectUser } from "../store/userSlice";
import userIcon from "../assets/userIcon.png";
import "../styles/headerStyle.scss";

function Header(): JSX.Element {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  function logOut(): void {
    // remove user from store;
    dispatch(removeUser());
  }

  return (
    <header>
      <Link to="/">
        <h1>My Blog</h1>
      </Link>
      <div className="buttons">
        {user === null ? (
          <>
            <Link to="/log-in" className="button">
            <i className="fa-solid fa-right-to-bracket" />
              Log In
            </Link>
            <Link to="/sign-up" className="button">
              Sign up
            </Link>
          </>
        ) : (
          <>
            {user.permission === "admin" ? (
              <button
                className="button"
                onClick={() => navigate("/create-post")}
                type="button"
              >
                Create post
              </button>
            ) : null}
            <button className="button" onClick={logOut} type="button">
              Log Out
            </button>
            <div className="user_display">
              <img src={userIcon} alt="" className="icon" />
              {user.username}
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
