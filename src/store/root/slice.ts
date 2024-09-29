import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultCustomError, ICustomError, IRootInitialState } from "@/store/root/types";
import { RootState } from "@/store";
import type { UIMatch } from "@remix-run/router";

const isCollapsed = window.localStorage.getItem("isCollapsed");

const initialState: IRootInitialState = {
  isCollapsed: isCollapsed === "true",
  pageTitle: "Dashboard",
  error: defaultCustomError,
  currentRoute: {
    id: "Dashboard",
    pathname: "/admin",
    params: {},
    data: undefined,
    handle: undefined,
  },
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
    },
    setCustomError: (state, action: PayloadAction<ICustomError>) => {
      state.error = action.payload;
    },
  },
});

export const { setIsCollapsed, setCurrentRoute, setCustomError } = rootSlice.actions;

export const rootStates = (state: RootState) => state.root;

export default rootSlice.reducer;
