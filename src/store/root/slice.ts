import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRootInitialState} from "@/store/root/types";
import {RootState} from "@/store";

const isCollapsed =  window.localStorage.getItem("isCollapsed");

const initialState: IRootInitialState = {
  isCollapsed: isCollapsed === "true",
  pageTitle: "Dashboard",
};

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setIsCollapsed: (state, action: PayloadAction<boolean>) => {
      window.localStorage.setItem("isCollapsed", JSON.stringify(action.payload));
      state.isCollapsed = action.payload;
    },
    setPageTitle: (state, action: PayloadAction<string>) => {
      state.pageTitle = action.payload;
    }
  },
});

export const {
  setIsCollapsed,
  setPageTitle
} = rootSlice.actions;

export const rootStates = (state: RootState) => state.root;

export default rootSlice.reducer;