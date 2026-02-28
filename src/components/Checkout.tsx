import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../constants';
import { ImageWithFallback } from './ImageWithFallback';

const formatPrice = (amount: number) =>
  `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

interface CheckoutProps {
  onBack: () => void;
  onPayment: (orderData: OrderData) => void;
}

export interface OrderData {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  subtotal: number;
  shipping: number;
  total: number;
}

export const Checkout = ({ onBack, onPayment }: CheckoutProps) => {
  const { items } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const cartProducts = items
    .map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter(Boolean) as { product: (typeof PRODUCTS)[0]; quantity: number }[];

  const subtotal = cartProducts.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!phone.trim()) e.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(phone.replace(/\s/g, ''))) e.phone = 'Enter valid 10-digit phone';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter valid email';
    if (!address.trim()) e.address = 'Address is required';
    if (!city.trim()) e.city = 'City is required';
    if (!pincode.trim()) e.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(pincode)) e.pincode = 'Enter valid 6-digit pincode';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onPayment({
      name,
      phone,
      email,
      address,
      city,
      pincode,
      subtotal,
      shipping,
      total,
    });
  };

  return (
    <div className="pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 dark:text-slate-200 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </button>

        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 bg-white dark:bg-surface-dark rounded-xl border border-slate-100 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Shipping Address
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white ${
                      errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'
                    } focus:ring-2 focus:ring-primary focus:border-primary`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone *</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white ${
                      errors.phone ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'
                    } focus:ring-2 focus:ring-primary focus:border-primary`}
                    placeholder="10-digit mobile"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white ${
                      errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'
                    } focus:ring-2 focus:ring-primary focus:border-primary`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Address *</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={2}
                    className={`w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white ${
                      errors.address ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'
                    } focus:ring-2 focus:ring-primary focus:border-primary`}
                    placeholder="Street, building, landmark"
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">City *</label>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white ${
                      errors.city ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'
                    } focus:ring-2 focus:ring-primary focus:border-primary`}
                    placeholder="City"
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Pincode *</label>
                  <input
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white ${
                      errors.pincode ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'
                    } focus:ring-2 focus:ring-primary focus:border-primary`}
                    placeholder="6-digit pincode"
                  />
                  {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 bg-white dark:bg-surface-dark rounded-xl border border-slate-100 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Order Summary
              </h3>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {cartProducts.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800">
                      <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 dark:text-white text-sm truncate">{product.name}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs">Qty: {quantity} × {formatPrice(product.price)}</p>
                    </div>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{formatPrice(product.price * quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-200 dark:border-slate-600 mt-4 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-slate-900 dark:text-white mt-2">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
              <button
                type="submit"
                className="w-full mt-6 py-3.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
