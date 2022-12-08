import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state: null | IUser, action) => action.payload,
    removeUser: (state: null | IUser) => null,
  },
});

export const { addUser, removeUser } = userSlice.actions;

export const selectUser = (state: UserState): IUser | null => state.user;

export default userSlice.reducer;
