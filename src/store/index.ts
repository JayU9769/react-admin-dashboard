import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "@/store/root/slice";
import userReducer from "@/store/user/slice";
import roleReducer from "@/store/roles/slice";
import adminReducer from "@/store/admin/slice";
import {ThunkAction} from "redux-thunk";
import {Action} from "redux";
import {rootApi} from "@/store/root/api.ts";
import {userApi} from "@/store/user/api.ts";
import {roleApi} from "@/store/roles/api.ts";
import {adminApi} from "@/store/admin/api.ts";


// Custom Sentry middleware to log actions and state changes
const sentryLogMiddleware = ({ getState }) => {
  return next => action => {
    console.log(action);
    // Capture the current state (if you want state before the action is dispatched)
    return next(action);
  };
};


// Use `configureStore` function to create the store:
const store = configureStore({
  reducer: {
    // Specify our reducer in the reducers object:
    root: rootReducer,
    [rootApi.reducerPath]: rootApi.reducer,
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    role: roleReducer,
    [roleApi.reducerPath]: roleApi.reducer,
    admin: adminReducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(rootApi.middleware)
      .concat(userApi.middleware)
      .concat(roleApi.middleware)
      .concat(adminApi.middleware)
      .concat(sentryLogMiddleware),
});

// Define the `RootState` as the return type:
export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
