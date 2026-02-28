import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, ShoppingBag, Package, XCircle, Clock } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import type { OrderData } from './Checkout';

const formatPrice = (amount: number) =>
  `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

const CANCELLATION_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

interface OrderSuccessProps {
  orderId: string;
  orderData: OrderData;
  onContinueShopping: () => void;
  onViewOrders?: () => void;
  onOrderCancelled: () => void;
}

export const OrderSuccess = ({ orderId, orderData, onContinueShopping, onViewOrders, onOrderCancelled }: OrderSuccessProps) => {
  const { cancelOrder, getOrder } = useOrders();
  const order = getOrder(orderId);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    if (!order) return;
    const placedAt = new Date(order.date).getTime();
    const deadline = placedAt + CANCELLATION_WINDOW_MS;

    const updateTimer = () => {
      const now = Date.now();
      if (now >= deadline) {
        setSecondsLeft(0);
        return;
      }
      setSecondsLeft(Math.ceil((deadline - now) / 1000));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [order?.date]);

  const handleCancel = () => {
    if (secondsLeft !== null && secondsLeft > 0) {
      cancelOrder(orderId);
      setCancelled(true);
      setTimeout(() => onOrderCancelled(), 1500);
    }
  };

  const canCancel = secondsLeft !== null && secondsLeft > 0 && !cancelled;
  const mins = secondsLeft !== null ? Math.floor(secondsLeft / 60) : 0;
  const secs = secondsLeft !== null ? secondsLeft % 60 : 0;

  if (cancelled) {
    return (
      <div className="pt-20">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center"
          >
            <XCircle className="w-14 h-14 text-red-500" />
          </motion.div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Order Cancelled</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">Your order has been cancelled successfully.</p>
          <button
            onClick={onOrderCancelled}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
        >
          <CheckCircle className="w-14 h-14 text-primary" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-slate-900 dark:text-white mb-2"
        >
          Order Placed Successfully!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-slate-600 dark:text-slate-400 mb-8"
        >
          Thank you for your order. We'll deliver to {orderData.address}, {orderData.city} - {orderData.pincode}.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-700 mb-6 text-left"
        >
          <p className="text-sm text-slate-500 dark:text-slate-400">Order total</p>
          <p className="text-2xl font-bold text-primary">{formatPrice(orderData.total)}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">A confirmation will be sent to {orderData.email}</p>
        </motion.div>

        {canCancel && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="p-4 mb-6 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Cancel within</span>
                <span className="font-mono font-bold text-lg tabular-nums">
                  {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
                </span>
              </div>
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg border-2 border-red-500 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium transition-colors flex items-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Cancel Order
              </button>
            </div>
          </motion.div>
        )}

        {secondsLeft === 0 && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Order confirmed. Cancellation window has ended.</p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onViewOrders && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={onViewOrders}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white dark:bg-surface-dark text-primary border-2 border-primary rounded-lg font-medium hover:bg-primary/10 transition-colors"
            >
              <Package className="w-5 h-5" />
              View Order History
            </motion.button>
          )}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={onContinueShopping}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            Continue Shopping
          </motion.button>
        </div>
      </div>
    </div>
  );
};
