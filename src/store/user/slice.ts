import {createSlice} from "@reduxjs/toolkit";
import {IUserInitialState} from "@/store/user/types";
import {RootState} from "@/store";

const initialState: IUserInitialState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
});

export const {
} = userSlice.actions;

export const userStates = (state: RootState) => state.user;

export default userSlice.reducer;