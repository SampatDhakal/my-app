import { createSlice } from "@reduxjs/toolkit";

import appApi from "../services/appApi";

export type SliceState = {
  id: string,
  name: string,
  picture: string,
  password: string,
  status: string,
  newMessages: any
};

const initialState: SliceState = {
  newMessages: {},
  id: "",
  name: "",
  picture: "",
  password: "",
  status: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState, // inititally no users
  reducers: {
    addNotifications: (state, { payload }) => {
      if (state.newMessages?.[payload]) {
        state.newMessages[payload] = state.newMessages[payload] + 1;
      } else {
        state.newMessages[payload] = 1;
      }
    },
    resetNotifications: (state, { payload }) => {
      delete state.newMessages[payload];
    },
  },

  extraReducers: (builder) => {
    // save user after signup
    builder.addMatcher(
      appApi.endpoints.signupUser.matchFulfilled,
      (state, { payload }) => payload
    );
    // save user after login
    builder.addMatcher(
      appApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => payload
    );
    // logout: destroy user session
    builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, () => ({
      newMessages: {},
      id: "",
      name: "",
      picture: "",
      password: "",
      status: ""
    }));
  },
});

export const { addNotifications, resetNotifications } = userSlice.actions;
export default userSlice.reducer;