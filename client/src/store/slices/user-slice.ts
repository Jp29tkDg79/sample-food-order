import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CurrentUser = {
  name: string;
  email: string;
  isAdmin: boolean;
};

type UserSlice = {
  curUser: CurrentUser;
  isLogin: boolean;
};

const initialState: UserSlice = {
  curUser: {
    name: "",
    email: "",
    isAdmin: false,
  },
  isLogin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserState(state: UserSlice, action: PayloadAction<CurrentUser>) {
      state.curUser.email = action.payload.email;
      state.curUser.isAdmin = action.payload.isAdmin;
      state.curUser.name = action.payload.name;
      state.isLogin = true;
    },
    clearUserState(state: UserSlice) {
      state.curUser.name = "";
      state.curUser.email = "";
      state.curUser.isAdmin = false;
      state.isLogin = false;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
