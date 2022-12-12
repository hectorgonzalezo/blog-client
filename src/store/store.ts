import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postsReducer from './postsSlice';

const store = configureStore({ reducer: { user: userReducer, posts: postsReducer } });

export default store;
