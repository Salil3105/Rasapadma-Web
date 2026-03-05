import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  productId: string;
  quantity: number;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as CartItem[],
  reducers: {
    addToCart: (state, action: PayloadAction<{ productId: string; quantity?: number }>) => {
      const { productId, quantity = 1 } = action.payload;
      const existing = state.find((i) => i.productId === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.push({ productId, quantity });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      return state.filter((i) => i.productId !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return state.filter((i) => i.productId !== productId);
      }
      const item = state.find((i) => i.productId === productId);
      if (item) item.quantity = quantity;
    },
    clearCart: () => [],
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
