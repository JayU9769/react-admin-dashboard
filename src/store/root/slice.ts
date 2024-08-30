import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRootInitialState} from "@/store/root/types";
import {RootState} from "@/store";
import type {UIMatch} from "@remix-run/router";

const isCollapsed =  window.localStorage.getItem("isCollapsed");

const initialState: IRootInitialState = {
  isCollapsed: isCollapsed === "true",
  pageTitle: "Dashboard",
  currentRoute: {
    id: "Dashboard",
    pathname: "/admin",
    params: {},
    data: undefined,
    handle: undefined
  }
};

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setIsCollapsed: (state, action: PayloadAction<boolean>) => {
      window.localStorage.setItem("isCollapsed", JSON.stringify(action.payload));
      state.isCollapsed = action.payload;
    },
    setCurrentRoute: (state, action: PayloadAction<UIMatch>) => {
      state.currentRoute = action.payload;
    }
  },
});

export const {
  setIsCollapsed,
  setCurrentRoute
} = rootSlice.actions;

export const rootStates = (state: RootState) => state.root;

export default rootSlice.reducer;