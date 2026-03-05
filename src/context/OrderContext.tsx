import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addOrder as addOrderThunk, cancelOrder } from '../store/slices/orderSlice';

export type { OrderItem, Order } from '../store/slices/orderSlice';

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const useOrders = () => {
  const orders = useAppSelector((s) => s.order);
  const dispatch = useAppDispatch();

  const addOrder = async (orderData: Parameters<typeof addOrderThunk>[0]) => {
    const order = await dispatch(addOrderThunk(orderData)).unwrap();
    return order;
  };

  return {
    orders,
    addOrder,
    cancelOrder: (id: string) => dispatch(cancelOrder(id)),
    getOrder: (id: string) => orders.find((o) => o.id === id),
  };
};
