import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state: null | IUser, action) => {
      console.log(action.payload)
        // add user to local storage
      localStorage.setItem("whoAmI", JSON.stringify(action.payload));
      return action.payload;
    },
    removeUser: (state: null | IUser) => {
      localStorage.removeItem("whoAmI");
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export const selectUser = (state: UserState): IUser | null => state.user;

export default userSlice.reducer;
