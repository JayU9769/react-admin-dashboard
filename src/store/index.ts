import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "@/store/root/slice";
import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';

// Use `configureStore` function to create the store:
const store = configureStore({
  reducer: {
    // Specify our reducer in the reducers object:
    root: rootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
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
