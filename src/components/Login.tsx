import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, ArrowLeft, Loader2, Leaf } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LoginProps {
  onSuccess?: () => void;
  onBack?: () => void;
}

export const Login = ({ onSuccess, onBack }: LoginProps) => {
  const navigate = useNavigate();
  const { user, sendOTP, verifyOTP, isLoading } = useAuth();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (user) {
      onSuccess ? onSuccess() : navigate('/');
    }
  }, [user, onSuccess, navigate]);

  if (user) return null;

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = await sendOTP(phone);
    if (result.success) {
      setStep('otp');
      setOtp('');
      setResendCooldown(30);
      const interval = setInterval(() => {
        setResendCooldown((c) => {
          if (c <= 1) clearInterval(interval);
          return Math.max(0, c - 1);
        });
      }, 1000);
    } else {
      setError(result.error || 'Failed to send OTP');
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = await verifyOTP(phone, otp);
    if (result.success) {
      onSuccess?.();
    } else {
      setError(result.error || 'Invalid OTP');
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setError('');
    const result = await sendOTP(phone);
    if (result.success) {
      setResendCooldown(30);
      setOtp('');
    } else {
      setError(result.error || 'Failed to resend');
    }
  };

  const formatPhone = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 10);
    setPhone(digits);
  };

  const formatOtp = (v: string) => {
    setOtp(v.replace(/\D/g, '').slice(0, 4));
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 flex items-center justify-center bg-slate-50 dark:bg-slate-900/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="bg-primary/5 dark:bg-primary/10 px-6 py-6 text-center border-b border-slate-200 dark:border-slate-700">
            <div className="inline-flex p-3 rounded-full bg-primary/10 dark:bg-primary/20 mb-3">
              <Leaf className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Welcome to Dr. Veda Wellness</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Sign in with your mobile number</p>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {step === 'phone' ? (
                <motion.form
                  key="phone"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={handleSendOTP}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 text-sm">
                        +91
                      </span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        placeholder="9876543210"
                        value={phone}
                        onChange={(e) => formatPhone(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow"
                        maxLength={10}
                        autoFocus
                      />
                      <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <button
                    type="submit"
                    disabled={phone.length !== 10 || isLoading}
                    className="w-full py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send OTP'}
                  </button>
                </motion.form>
              ) : (
                <motion.form
                  key="otp"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onSubmit={handleVerifyOTP}
                  className="space-y-4"
                >
                  <button
                    type="button"
                    onClick={() => { setStep('phone'); setError(''); setOtp(''); }}
                    className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-primary text-sm font-medium"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Change number
                  </button>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Enter the 4-digit OTP sent to <span className="font-semibold">+91 {phone}</span>
                  </p>
                  <div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="1234"
                      value={otp}
                      onChange={(e) => formatOtp(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-center text-lg tracking-[0.5em] placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow"
                      maxLength={4}
                      autoFocus
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
                      Demo: Use <span className="font-mono font-semibold text-primary">1234</span> to sign in
                    </p>
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <button
                    type="submit"
                    disabled={otp.length !== 4 || isLoading}
                    className="w-full py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify & Sign In'}
                  </button>
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resendCooldown > 0 || isLoading}
                    className="w-full text-sm text-primary hover:text-primary-dark disabled:text-slate-400 disabled:cursor-not-allowed font-medium"
                  >
                    {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : 'Resend OTP'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {onBack && (
          <button
            onClick={onBack}
            className="mt-4 w-full py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            ← Back
          </button>
        )}
      </motion.div>
    </div>
  );
};
