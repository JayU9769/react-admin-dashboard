import { Middleware } from "@reduxjs/toolkit";
import { setCustomError } from "@/store/root/slice.ts";
import { showAlert } from "@/components/ui/sonner.tsx";

const index: Middleware = ({ dispatch }) => {
  return (next) => (action: any) => {
    if (action.type.includes("rejected") && action.error) {
      const errorMessage = action.payload.message || action.payload.data.message || "Server side validation failed";
      const { pathname } = window.location;
      if (pathname !== "/" && !pathname.includes("login")) {
        if (action.payload.status === 401) {
          window.location.href = "/";
        } else if (action.payload.status === 422) {
          showAlert(errorMessage, "error");
        } else {
          dispatch(
            setCustomError({
              message: "Oops, it looks like Something went wrong.",
              statusCode: action.payload.status,
            })
          );
        }
      } else {
        if (action.payload.status === 422) {
          showAlert(errorMessage, "error");
        }
      }
    }
    // Capture the current state (if you want state before the action is dispatched)
    return next(action);
  };
};

export default index;
