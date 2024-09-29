import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@/store/root/slice";
import userReducer from "@/store/user/slice";
import roleReducer from "@/store/role/slice";
import adminReducer from "@/store/admin/slice";
import permissionReducer from "@/store/permission/slice";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import handleError from "@/store/middlewares/handleError.ts";
import { rootApi } from "@/store/root/api.ts";
import { userApi } from "@/store/user/api.ts";
import { roleApi } from "@/store/role/api.ts";
import { adminApi } from "@/store/admin/api.ts";
import { permissionApi } from "@/store/permission/api.ts";

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
    permission: permissionReducer,
    [permissionApi.reducerPath]: permissionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(rootApi.middleware)
      .concat(userApi.middleware)
      .concat(roleApi.middleware)
      .concat(adminApi.middleware)
      .concat(permissionApi.middleware)
      .concat(handleError),
});

// Define the `RootState` as the return type:
export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export default store;
