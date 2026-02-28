import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../constants';
import { ImageWithFallback } from './ImageWithFallback';

const formatPrice = (amount: number) =>
  `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

interface CartProps {
  onCheckout: () => void;
  onBack: () => void;
}

export const Cart = ({ onCheckout, onBack }: CartProps) => {
  const { items, updateQuantity, removeFromCart, getTotalCount } = useCart();

  const cartProducts = items
    .map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter(Boolean) as { product: (typeof PRODUCTS)[0]; quantity: number }[];

  const subtotal = cartProducts.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="pt-14 min-[375px]:pt-16 sm:pt-20">
        <div className="max-w-2xl mx-auto px-3 min-[375px]:px-4 sm:px-6 lg:px-8 py-12 min-[375px]:py-16 text-center">
          <div className="w-16 h-16 min-[375px]:w-20 min-[375px]:h-20 sm:w-24 sm:h-24 mx-auto mb-4 min-[375px]:mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <ShoppingCart className="w-8 h-8 min-[375px]:w-10 min-[375px]:h-10 sm:w-12 sm:h-12 text-primary" />
          </div>
          <h2 className="text-xl min-[375px]:text-2xl font-bold text-slate-900 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-sm min-[375px]:text-base text-slate-600 dark:text-slate-400 mb-6 min-[375px]:mb-8">Add some Ayurvedic goodness to get started!</p>
          <button
            onClick={onBack}
            className="px-5 min-[375px]:px-6 py-2.5 min-[375px]:py-3 text-sm min-[375px]:text-base bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-14 min-[375px]:pt-16 sm:pt-20 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-3 min-[375px]:px-4 sm:px-6 lg:px-8 py-6 min-[375px]:py-8 lg:py-12">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 min-[375px]:gap-2 text-sm min-[375px]:text-base text-slate-600 dark:text-slate-200 hover:text-primary mb-4 min-[375px]:mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          Continue Shopping
        </button>
        <h1 className="text-xl min-[375px]:text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6 min-[375px]:mb-8 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 min-[375px]:w-8 min-[375px]:h-8 text-primary shrink-0" />
          Cart ({getTotalCount()} {getTotalCount() === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-[375px]:gap-8">
          <div className="lg:col-span-2 space-y-3 min-[375px]:space-y-4">
            {cartProducts.map(({ product, quantity }) => (
              <motion.div
                key={product.id}
                layout
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5 bg-white dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-600/60 shadow-sm"
              >
                <div className="flex gap-4 min-w-0 flex-1">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700/50 ring-1 ring-slate-200/50 dark:ring-slate-600/50">
                    <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <h3 className="font-semibold text-base text-slate-900 dark:text-white truncate">{product.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{product.category}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      {formatPrice(product.price)} <span className="text-slate-400 dark:text-slate-500">× {quantity}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 sm:flex-shrink-0 border-t border-slate-100 dark:border-slate-600/60 pt-4 sm:pt-0 sm:border-t-0">
                  <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden bg-slate-50/50 dark:bg-slate-700/50">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-600/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    </button>
                    <span className="min-w-[2.5rem] text-center text-sm font-semibold text-slate-900 dark:text-white py-2">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-600/50 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-primary min-w-[4rem] text-right">
                      {formatPrice(product.price * quantity)}
                    </span>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 p-4 min-[375px]:p-6 bg-white dark:bg-surface-dark rounded-xl border border-slate-100 dark:border-slate-700">
              <h3 className="font-semibold text-sm min-[375px]:text-base text-slate-900 dark:text-white mb-3 min-[375px]:mb-4">Order Summary</h3>
              <div className="space-y-1.5 min-[375px]:space-y-2 text-sm min-[375px]:text-base text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-600 mt-3 min-[375px]:mt-4 pt-3 min-[375px]:pt-4 flex justify-between font-bold text-slate-900 dark:text-white text-sm min-[375px]:text-base">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
              <p className="text-[10px] min-[375px]:text-xs text-slate-500 dark:text-slate-400 mt-1.5 min-[375px]:mt-2">Free shipping on orders above ₹500</p>
              <button
                onClick={onCheckout}
                className="w-full mt-4 min-[375px]:mt-6 py-2.5 min-[375px]:py-3.5 text-sm min-[375px]:text-base bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4 min-[375px]:w-5 min-[375px]:h-5 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
