import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, CheckCircle, Shield } from 'lucide-react';
import type { OrderData } from './Checkout';

const formatPrice = (amount: number) =>
  `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

type PaymentMethod = 'card' | 'upi' | 'cod';

interface PaymentProps {
  orderData: OrderData;
  onBack: () => void;
  onSuccess: () => void;
}

export const Payment = ({ orderData, onBack, onSuccess }: PaymentProps) => {
  const [method, setMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const validateCard = () => {
    if (!cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) return 'Enter valid 16-digit card number';
    if (!expiry.match(/^\d{2}\/\d{2}$/)) return 'Enter valid expiry (MM/YY)';
    if (!cvv.match(/^\d{3,4}$/)) return 'Enter valid CVV';
    return '';
  };

  const validateUpi = () => {
    if (!upiId.trim()) return 'Enter UPI ID';
    if (!upiId.includes('@')) return 'Enter valid UPI ID (e.g. name@paytm)';
    return '';
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (method === 'card') {
      const err = validateCard();
      if (err) {
        setError(err);
        return;
      }
    } else if (method === 'upi') {
      const err = validateUpi();
      if (err) {
        setError(err);
        return;
      }
    }

    setProcessing(true);
    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 2000));
    setProcessing(false);
    onSuccess();
  };

  return (
    <div className="pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 dark:text-slate-200 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Checkout
        </button>

        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-6 h-6 text-primary" />
          <span className="text-sm text-slate-500 dark:text-slate-400">Secure payment • Demo mode</span>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Payment</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">Amount to pay: <span className="font-bold text-primary">{formatPrice(orderData.total)}</span></p>

        <form onSubmit={handlePay} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Payment Method</label>
            <div className="space-y-2">
              {[
                { id: 'card' as const, label: 'Credit / Debit Card', icon: CreditCard },
                { id: 'upi' as const, label: 'UPI', icon: Smartphone },
                { id: 'cod' as const, label: 'Cash on Delivery', icon: CheckCircle },
              ].map((m) => (
                <label
                  key={m.id}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                    method === m.id
                      ? 'border-primary bg-primary/5 dark:bg-primary/10'
                      : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                  }`}
                >
                  <input
                    type="radio"
                    name="method"
                    value={m.id}
                    checked={method === m.id}
                    onChange={() => setMethod(m.id)}
                    className="sr-only"
                  />
                  <m.icon className="w-5 h-5 text-primary" />
                  <span className="font-medium text-slate-900 dark:text-white">{m.label}</span>
                </label>
              ))}
            </div>
          </div>

          {method === 'card' && (
            <div className="space-y-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Card Number</label>
                <input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Expiry (MM/YY)</label>
                  <input
                    value={expiry}
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                      if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2);
                      setExpiry(v);
                    }}
                    placeholder="MM/YY"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">CVV</label>
                  <input
                    type="password"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="123"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {method === 'upi' && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">UPI ID</label>
              <input
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="name@paytm / name@phonepe"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary"
              />
            </div>
          )}

          {method === 'cod' && (
            <p className="text-slate-600 dark:text-slate-400 text-sm">Pay when your order is delivered. Available for orders in Pune.</p>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={processing}
            className="w-full py-3.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {processing ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>Pay {formatPrice(orderData.total)}</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
