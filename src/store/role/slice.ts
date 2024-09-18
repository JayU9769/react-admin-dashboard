import { createSlice } from "@reduxjs/toolkit";
import { IRoleInitialState } from "./types";
import { RootState } from "@/store";

const initialState: IRoleInitialState = {};

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
});

// eslint-disable-next-line no-empty-pattern
export const {} = roleSlice.actions;

export const userStates = (state: RootState) => state.role;

export default roleSlice.reducer;
