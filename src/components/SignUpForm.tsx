import React, { useState, useRef, SyntheticEvent, MutableRefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';
import { signUp } from '../API/user';
import InputWrapper from './InputWrapper';
import loadingLogo from '../assets/loading.gif';


function SignUpForm(): JSX.Element{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const usernameRef: MutableRefObject<null | HTMLInputElement> = useRef(null);
  const usernameErrRef: MutableRefObject<null | HTMLSpanElement> = useRef(null);
  const passwordRef: MutableRefObject<null | HTMLInputElement> = useRef(null);
  const passwordErrRef: MutableRefObject<null | HTMLSpanElement> = useRef(null);
  const passwordConfirmRef: MutableRefObject<null | HTMLInputElement> = useRef(null);
  const passwordConfirmErrRef: MutableRefObject<null | HTMLSpanElement> = useRef(null);
  const formRef: MutableRefObject<null | HTMLFormElement> = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function submitForm (e: SyntheticEvent): void {
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
        passwordConfirm: passwordConfirmRef.current?.value,
        permission: 'regular' as const,
      };
      signUp(user)
        .then((data) => {
          setLoading(false);
          // if theres an error, render it.
          if(data.errors !== undefined) {
            // show message
            displayErrors(data.errors);
          } else {
            // if theres no error
            // add user and token to redux store
            const userWithToken = Object.assign({}, data.user, {
              token: data.token,
            });
            dispatch(addUser(userWithToken));
            navigate("/");

          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error)
        });
    }
  }

  // display errors from sign up in their respective areas
  function displayErrors(
    errors: SignUpError[]
  ): void {
    errors.forEach((error: SignUpError) => {
      switch (error.msg) {
        case "Passwords don't match!":
          if (passwordConfirmErrRef.current !== null) {
            passwordConfirmErrRef.current.innerText = error.msg;
          }
          break;
        case "Username already exists":
          if (usernameErrRef.current !== null) {
            usernameErrRef.current.innerText = error.msg;
          }
          break;
        case "User name must be between 3 and 25 characters long":
          if (usernameErrRef.current !== null) {
            usernameErrRef.current.innerText = error.msg;
          }
          break;
        case "Password must be at least 6 characters long":
          if (passwordErrRef.current !== null) {
            passwordErrRef.current.innerText = error.msg;
          }
          break;
        default:
          break;
      }
    })
  }

  function validateUsername(e: SyntheticEvent<HTMLInputElement>): void {
    const field = e.currentTarget;
      setUsername(field.value);
    if( usernameErrRef.current !== null){
      // Check if username is within boundaries, display error message if not
      if (field.validity.tooShort || field.validity.tooLong) {
        usernameErrRef.current.innerText =
          "Username must be between 3 and 25 characters long";
        field.setCustomValidity("Username must be between 3 and 25 characters long")
      } else {
        usernameErrRef.current.innerText = "";
        field.setCustomValidity("");
      }
    }
  }

  function validatePassword(e: SyntheticEvent<HTMLInputElement>): void {
    const field = e.currentTarget;
      setPassword(field.value);
    if( passwordErrRef.current !== null){
      // Check if password is within boundaries, display error message if not
      if (field.validity.tooShort) {
        passwordErrRef.current.innerText =
          "Password must be at least 6 characters long";
        field.setCustomValidity("Password must be at least 6 characters long")
      } else {
        passwordErrRef.current.innerText = "";
        field.setCustomValidity("");
      }
    }
  }

  function validatePasswordConfirm(e: SyntheticEvent<HTMLInputElement>): void {
    const field = e.currentTarget;
      setPasswordConfirm(field.value);
    if( passwordConfirmErrRef.current !== null){
      // Check if password is within boundaries, display error message if not
      if (field.validity.tooShort) {
        passwordConfirmErrRef.current.innerText =
          "Password must be at least 6 characters long";
        field.setCustomValidity("Password must be at least 6 characters long")
      } else {
        passwordConfirmErrRef.current.innerText = "";
        field.setCustomValidity("");
      }
    }
  }


  return (
    <>
      <form action="" ref={formRef}>
        <h1>Sign Up</h1>
        <InputWrapper name="username" errRef={usernameErrRef}>
          <input
            type="text"
            name="username"
            value={username}
            minLength={3}
            maxLength={25}
            placeholder='Username'
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
        <InputWrapper name="confirmPassword" errRef={passwordConfirmErrRef}>
          <input
            type="password"
            name="confirmPassword"
            value={passwordConfirm}
            minLength={6}
            onChange={validatePasswordConfirm}
            ref={passwordConfirmRef}
            autoComplete="on"
            required
          />
        </InputWrapper>
        <button className="button" onClick={submitForm} type="submit">
          {loading?
          <img src={loadingLogo} alt="" />
          :"Sign Up"
  }
        </button>
      </form>
    </>
  );
}

export default SignUpForm
