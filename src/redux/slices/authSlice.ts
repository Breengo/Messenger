import { createSlice } from "@reduxjs/toolkit";

type UserData = {
  displayName: string;
  email: string;
  photoURL: string;
  accessToken?: string;
  uid: string;
};

interface IAuthState {
  isAuth: boolean;
  userData: null | UserData;
}

const initialState: IAuthState = {
  isAuth: false,
  userData: null,
};

const auhtSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = auhtSlice.actions;

export default auhtSlice.reducer;
