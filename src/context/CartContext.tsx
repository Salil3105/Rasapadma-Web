import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToCart as addToCartAction, removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';

export type CartItem = { productId: string; quantity: number };

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const useCart = () => {
  const items = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch();

  return {
    items,
    addToCart: (productId: string, quantity?: number) =>
      dispatch(addToCartAction({ productId, quantity })),
    removeFromCart: (productId: string) => dispatch(removeFromCart(productId)),
    updateQuantity: (productId: string, quantity: number) =>
      dispatch(updateQuantity({ productId, quantity })),
    getQuantity: (productId: string) =>
      items.find((i) => i.productId === productId)?.quantity ?? 0,
    getTotalCount: () => items.reduce((sum, i) => sum + i.quantity, 0),
    clearCart: () => dispatch(clearCart()),
  };
};
