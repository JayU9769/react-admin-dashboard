import {configureStore} from '@reduxjs/toolkit';
import rootReducer from "@/store/root/slice";
import userReducer from "@/store/user/slice";
import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';
import {rootApi} from "@/store/root/api.ts";
import {userApi} from "@/store/user/api.ts";

// Use `configureStore` function to create the store:
const store = configureStore({
  reducer: {
    // Specify our reducer in the reducers object:
    root: rootReducer,
    [rootApi.reducerPath]: rootApi.reducer,
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(rootApi.middleware)
      .concat(userApi.middleware)
  ,
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
