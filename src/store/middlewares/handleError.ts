import {Middleware} from "@reduxjs/toolkit";
import {setCustomError} from "@/store/root/slice.ts";

const index: Middleware = ({dispatch}) => {
  return next => (action: any) => {
    if (action.type.includes("rejected") && action.error) {
      const {pathname} = window.location
      if (pathname !== "/" && !pathname.includes('login')) {
        if (action.payload.status === 401) {
          window.location.href = "/";
        } else {
          dispatch(setCustomError({
            message: "Oops, it looks like Something went wrong.",
            statusCode: action.payload.status,
          }))
        }
      }
    }
    // Capture the current state (if you want state before the action is dispatched)
    return next(action);
  };
};


export default index;