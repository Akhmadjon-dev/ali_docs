import { configureStore } from "@reduxjs/toolkit";
import costumerReducer from "./customers/customerSlice";

export default configureStore({
  reducer: {
    costumer: costumerReducer,
  },
});
