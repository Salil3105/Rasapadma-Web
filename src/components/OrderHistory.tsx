import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, ChevronDown, ChevronUp, MapPin, Calendar, ShoppingBag } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { ImageWithFallback } from './ImageWithFallback';

const formatPrice = (amount: number) =>
  `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const statusColors: Record<string, string> = {
  placed: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200',
  shipped: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
  delivered: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
};

interface OrderHistoryProps {
  onGoToShop?: () => void;
  onProductClick?: (productId: string) => void;
}

export const OrderHistory = ({ onGoToShop, onProductClick }: OrderHistoryProps) => {
  const { orders } = useOrders();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (orders.length === 0) {
    return (
      <div className="pt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <Package className="w-12 h-12 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No orders yet</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">Your order history will appear here once you place an order.</p>
          {onGoToShop && (
            <button
              onClick={onGoToShop}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Explore Shop
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <Package className="w-7 h-7 sm:w-8 sm:h-8 text-primary shrink-0" />
          Order History
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-6 sm:mb-8">Your recent orders</p>

        <div className="space-y-4">
          <AnimatePresence>
            {orders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-600/60 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                  className="w-full p-4 sm:p-5 text-left hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex gap-3 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Package className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-slate-900 dark:text-white truncate text-sm sm:text-base">{order.id}</p>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          {formatDate(order.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 border-t border-slate-100 dark:border-slate-600/60 pt-3 sm:pt-0 sm:border-t-0">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize shrink-0 ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                      <span className="font-bold text-primary text-base sm:text-lg">{formatPrice(order.total)}</span>
                      {expandedId === order.id ? (
                        <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                      )}
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {expandedId === order.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-slate-100 dark:border-slate-700 overflow-hidden"
                    >
                      <div className="p-4 sm:p-5 space-y-4">
                        <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                          <span className="break-words">
                            {order.address}, {order.city} - {order.pincode}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Items ({order.items.length})</p>
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div
                                key={`${order.id}-${item.productId}`}
                                className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                              >
                                <button
                                  type="button"
                                  onClick={() => onProductClick?.(item.productId)}
                                  className={`flex gap-3 min-w-0 text-left w-full sm:w-auto transition-opacity ${onProductClick ? 'cursor-pointer hover:opacity-90' : ''}`}
                                >
                                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-700">
                                    <ImageWithFallback
                                      src={item.image}
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-slate-900 dark:text-white text-sm sm:text-base hover:text-primary transition-colors">{item.name}</p>
                                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                                      Qty: {item.quantity} × {formatPrice(item.price)}
                                    </p>
                                  </div>
                                </button>
                                <p className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base sm:ml-auto self-end sm:self-center">
                                  {formatPrice(item.price * item.quantity)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between text-sm pt-2 border-t border-slate-200 dark:border-slate-600">
                          <span className="text-slate-500 dark:text-slate-400">Subtotal</span>
                          <span>{formatPrice(order.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500 dark:text-slate-400">Shipping</span>
                          <span>{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-slate-900 dark:text-white pt-2">
                          <span>Total</span>
                          <span className="text-primary">{formatPrice(order.total)}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
