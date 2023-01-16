import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "./store/userSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainContainer from "./components/MainContainer";

import "./styles/app.scss";
import "./styles/mainStyle.scss";

function App(): JSX.Element {
  const dispatch = useDispatch();

    // look if theres a user stored in local storage
  // this keeps the user logged in even after closing the broswer
  useEffect(() => {
    const previousUser = localStorage.getItem('whoAmI');
    if (previousUser !== null) {
      const parsedUser = JSON.parse(previousUser);
      dispatch(addUser(parsedUser));
    }
  },[]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <MainContainer />
        <Footer projectName="blog_client" />
      </BrowserRouter>
    </div>
  );
}

export default App;
