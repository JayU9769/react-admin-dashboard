import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAdminInitialState } from "./types";
import { RootState } from "@/store";
import { defaultAdmin, IAdmin } from "@/interfaces/admin";
import { adminApi } from "./api";

const initialState: IAdminInitialState = {
  auth: defaultAdmin,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IAdmin>) => {
      state.auth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        adminApi.endpoints.login.matchFulfilled,
        (state, action: PayloadAction<IAdmin>) => {
          state.auth = action.payload;
        }
      )
      .addMatcher(
        adminApi.endpoints.getAuth.matchFulfilled,
        (state, action: PayloadAction<IAdmin>) => {
          state.auth = action.payload;
        }
      )
      .addMatcher(adminApi.endpoints.logout.matchFulfilled, (state) => {
        state.auth = defaultAdmin;
      });
  },
});

export const { setAuth } = adminSlice.actions;

export const adminStates = (state: RootState) => state.admin;

export default adminSlice.reducer;
