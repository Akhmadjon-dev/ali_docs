import { configureStore } from "@reduxjs/toolkit";
import costumerReducer from "./customers/customerSlice";
import userReducer from "./auth/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    costumer: costumerReducer,
  },
});
