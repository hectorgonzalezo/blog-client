import React, {
  useState,
  useRef,
  SyntheticEvent,
  MutableRefObject,
} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { logIn } from "../API/user";
import InputWrapper from "./InputWrapper";
import loadingLogo from "../assets/loading.gif";

function LogInForm(): JSX.Element {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const usernameRef: MutableRefObject<null | HTMLInputElement> = useRef(null);
  const usernameErrRef: MutableRefObject<null | HTMLSpanElement> = useRef(null);
  const passwordRef: MutableRefObject<null | HTMLInputElement> = useRef(null);
  const passwordErrRef: MutableRefObject<null | HTMLSpanElement> = useRef(null);
  const formRef: MutableRefObject<null | HTMLFormElement> = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function submitForm(e: SyntheticEvent): void {
    // Check if form is valid
    if (
      formRef.current !== null &&
      usernameRef.current !== null &&
      passwordRef.current !== null &&
      formRef.current.reportValidity()
    ) {
      e.preventDefault();
      // Show loading logo on button
      setLoading(true);
      // if it is, submit data
      const user = {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      };
      logIn(user)
        .then((data) => {
          setLoading(false);
          // if a user is found save token
          if (data.user !== false) {
            // add user and token to redux store
            const userWithToken = Object.assign({}, data.user, {
              token: data.token,
            });
            dispatch(addUser(userWithToken));
            navigate("/");
          } else {
            // show message
            setFetchError(true);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  }

  function validateUsername(e: SyntheticEvent<HTMLInputElement>): void {
    const field = e.currentTarget;
    setUsername(field.value);
    if (usernameErrRef.current !== null) {
      // Check if username is within boundaries, display error message if not
      if (field.validity.tooShort || field.validity.tooLong) {
        usernameErrRef.current.innerText =
          "Username must be between 3 and 25 characters long";
        field.setCustomValidity(
          "Username must be between 3 and 25 characters long"
        );
      } else {
        usernameErrRef.current.innerText = "";
        field.setCustomValidity("");
      }
    }
  }

  function validatePassword(e: SyntheticEvent<HTMLInputElement>): void {
    const field = e.currentTarget;
    setPassword(field.value);
    if (passwordErrRef.current !== null) {
      // Check if password is within boundaries, display error message if not
      if (field.validity.tooShort) {
        passwordErrRef.current.innerText =
          "Password must be at least 6 characters long";
        field.setCustomValidity("Password must be at least 6 characters long");
      } else {
        passwordErrRef.current.innerText = "";
        field.setCustomValidity("");
      }
    }
  }

  return (
    <form action="" ref={formRef} className="user_form">
      <h1>Log In</h1>
      <InputWrapper name="username" errRef={usernameErrRef}>
        <input
          type="text"
          name="username"
          value={username}
          minLength={3}
          maxLength={25}
          placeholder="Username"
          onChange={validateUsername}
          ref={usernameRef}
          required
        />
      </InputWrapper>
      <InputWrapper name="password" errRef={passwordErrRef}>
        <input
          type="password"
          name="password"
          value={password}
          minLength={6}
          onChange={validatePassword}
          ref={passwordRef}
          autoComplete="on"
          required
        />
      </InputWrapper>
      {fetchError ? (
        <span className="error">Username or password are incorrect</span>
      ) : null}
      <button className="button" onClick={submitForm} type="submit">
        {loading ? <img src={loadingLogo} className="loading-logo" alt="" /> : "Log In"}
      </button>
    </form>
  );
}

export default LogInForm;
