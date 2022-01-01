import {
  useSelector as rawUseSelector,
  TypedUseSelectorHook,
} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./slices/cart-slice";
import userSlice from "./slices/user-slice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    user: userSlice.reducer,
  },
});

export type RootDispatch = typeof store.dispatch;

type RootState = ReturnType<typeof store.getState>;

export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;

export default store;
