import { createSlice } from "@reduxjs/toolkit";
import { IPermissionInitialState } from "./types";
import { RootState } from "@/store";

const initialState: IPermissionInitialState = {};

export const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {},
});

// eslint-disable-next-line no-empty-pattern
export const {} = permissionSlice.actions;

export const permissionStates = (state: RootState) => state.permission;

export default permissionSlice.reducer;
