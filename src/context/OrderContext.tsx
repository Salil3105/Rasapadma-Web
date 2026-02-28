import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type Order = {
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
};

const STORAGE_KEY = 'drveda_order_history';

type OrderContextType = {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => Order;
  cancelOrder: (id: string) => void;
  getOrder: (id: string) => Order | undefined;
};

const OrderContext = createContext<OrderContextType | null>(null);

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

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(loadOrders());
  }, []);

  const addOrder = useCallback((orderData: Omit<Order, 'id' | 'date' | 'status'>): Order => {
    const order: Order = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'placed',
    };
    setOrders((prev) => {
      const next = [order, ...prev];
      saveOrders(next);
      return next;
    });
    return order;
  }, []);

  const cancelOrder = useCallback((id: string) => {
    setOrders((prev) => {
      const next = prev.filter((o) => o.id !== id);
      saveOrders(next);
      return next;
    });
  }, []);

  const getOrder = useCallback(
    (id: string) => orders.find((o) => o.id === id),
    [orders]
  );

  return (
    <OrderContext.Provider value={{ orders, addOrder, cancelOrder, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used within OrderProvider');
  return ctx;
};
