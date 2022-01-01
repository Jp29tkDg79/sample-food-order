import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Item = {
  itemId: string;
  price: number;
  quantity: number;
  name: string;
};

export type CartSlice = {
  items: Item[];
  totalQuantity: number;
  totalPrice: number;
};

const initialState: CartSlice = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    replaceCart(state: CartSlice, action: PayloadAction<CartSlice>) {
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice = action.payload.totalPrice;
      state.items = action.payload.items;
    },
    addItemToCart(state: CartSlice, action: PayloadAction<Item>) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.itemId === newItem.itemId
      );
      state.totalQuantity++;
      state.totalPrice += newItem.price;
      if (!existingItem) {
        state.items.push({
          itemId: newItem.itemId,
          price: newItem.price,
          quantity: 1,
          name: newItem.name,
        });
      } else {
        existingItem.quantity += newItem.quantity;
      }
    },
    removeItemFormCart(state: CartSlice, action: PayloadAction<string>) {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.itemId === itemId)!;
      state.totalQuantity--;
      state.totalPrice -= existingItem.price;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.itemId !== itemId);
      } else {
        existingItem.quantity--;
      }
    },
    clearCart(state: CartSlice) {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
