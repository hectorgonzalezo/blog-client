import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    addPosts: (state: [] | IPost[], action) => {
      state = action.payload;
      return action.payload;
    },
    removePosts: (state: [] | IPost[]) => {
      state = [];
      return [];
    },
  },
});

export const { addPosts, removePosts } = postsSlice.actions;

export const selectPosts = (state: { posts: IPost[] | []}): IPost[] | [] => state.posts;

export default postsSlice.reducer;
