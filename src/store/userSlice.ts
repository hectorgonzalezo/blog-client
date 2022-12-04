import * as actionTypes from "./actionTypes";
import { createSlice } from '@reduxjs/toolkit';

const initialState: UserState = {
  user: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state: UserState, action) => {
      state.user = action.payload;
    },
    removeUser: (state: UserState, action) => {
      state.user = null;
    },
  }
});

export const { addUser, removeUser } = userSlice.actions;

export const selectUser = (state: UserState): IUser | null => state.user;

export default userSlice.reducer;