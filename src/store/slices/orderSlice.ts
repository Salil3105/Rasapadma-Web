import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

const STORAGE_KEY = 'drveda_order_history';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'placed' | 'shipped' | 'delivered';
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
}

const loadOrders = (): Order[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveOrders = (orders: Order[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
};

export type AddOrderPayload = Omit<Order, 'id' | 'date' | 'status'>;

export const addOrder = createAsyncThunk<Order, AddOrderPayload>(
  'order/addOrder',
  async (orderData) => {
    const order: Order = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'placed',
    };
    return order;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: loadOrders(),
  reducers: {
    cancelOrder: (state, action: PayloadAction<string>) => {
      const next = state.filter((o) => o.id !== action.payload);
      saveOrders(next);
      return next;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addOrder.fulfilled, (state, action) => {
      const next = [action.payload, ...state];
      saveOrders(next);
      return next;
    });
  },
});

export const { cancelOrder } = orderSlice.actions;
export default orderSlice.reducer;
