import React, { useState } from 'react';
import { Star, Leaf, ChevronLeft, ChevronRight, CheckCircle, HelpCircle, CreditCard, Smartphone, Shield, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

type PaymentMethod = 'card' | 'upi' | 'cod';

const formatPrice = (amount: number) =>
  `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

export const Booking = () => {
  const [selectedDate, setSelectedDate] = useState(10);
  const [selectedTime, setSelectedTime] = useState('10:30 AM');
  const [service, setService] = useState('initial');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  const amount = service === 'initial' ? 150 : 85;
  const timeSlots = ['09:00 AM', '10:30 AM', '01:00 PM', '02:15 PM', '04:00 PM'];

  const handleConfirmSlot = () => {
    setBookingConfirmed(true);
  };

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
    setPaymentError('');
    if (paymentMethod === 'card') {
      const err = validateCard();
      if (err) {
        setPaymentError(err);
        return;
      }
    } else if (paymentMethod === 'upi') {
      const err = validateUpi();
      if (err) {
        setPaymentError(err);
        return;
      }
    }
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setProcessing(false);
    setPaymentDone(true);
  };

  return (
    <div className="pt-20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Doctor Profile */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-primary/10 dark:border-slate-700 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-24 bg-primary/10"></div>
              <div className="relative z-10 flex flex-col items-center text-center mt-4">
                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-600 shadow-md overflow-hidden mb-4 relative">
                  <ImageWithFallback 
                    alt="Dr. Aditi Sharma" 
                    className="w-full h-full object-cover" 
                    src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&w=800&q=80" 
                  />
                </div>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Dr. Aditi Sharma</h2>
                <p className="text-sm font-medium text-primary mb-2">B.A.M.S., M.D. (Ayurveda)</p>
                <div className="flex items-center space-x-1 text-yellow-500 mb-4 text-sm">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  <span className="text-slate-400 ml-2">(120+ Reviews)</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                  "Healing is not just the absence of disease, but the restoration of balance. My practice bridges ancient Vedic wisdom with modern diagnostics."
                </p>
                <div className="w-full grid grid-cols-3 gap-2 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-600 pt-4">
                  <div>
                    <span className="block font-bold text-slate-900 dark:text-white text-lg">15+</span>
                    Years Exp.
                  </div>
                  <div>
                    <span className="block font-bold text-slate-900 dark:text-white text-lg">5k+</span>
                    Patients
                  </div>
                  <div>
                    <span className="block font-bold text-slate-900 dark:text-white text-lg">4.9</span>
                    Rating
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 border border-primary/10 dark:border-slate-600">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                <Leaf className="text-primary w-5 h-5" />
                My Approach
              </h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></span>
                  <span><strong>Prakriti Analysis:</strong> Understanding your unique body constitution.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></span>
                  <span><strong>Nadi Pariksha:</strong> Traditional pulse diagnosis to detect imbalances.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></span>
                  <span><strong>Customized Herbs:</strong> Formulations tailored specifically for you.</span>
                </li>
              </ul>
            </div>

            <div className="relative pl-4 border-l-4 border-primary/30 py-1">
              <p className="italic text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                "Dr. Sharma's consultation was transformative. She identified root causes that other doctors missed for years."
              </p>
              <p className="text-xs font-bold text-primary mt-2">— Sarah Jenkins, Patient</p>
            </div>
          </div>

          {/* Right Column: Booking Widget */}
          <div className="lg:col-span-8 space-y-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">Book Your Consultation</h2>
              <p className="text-slate-500 dark:text-slate-400">Select a service type and choose a convenient time for your appointment.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label 
                onClick={() => setService('initial')}
                className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all shadow-sm ${service === 'initial' ? 'border-primary bg-primary/5 dark:bg-primary/20' : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-surface-dark'}`}
              >
                <input type="radio" checked={service === 'initial'} readOnly className="h-4 w-4 text-primary border-gray-300 focus:ring-primary" />
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="block text-sm font-semibold text-slate-900 dark:text-white">Initial Consultation</span>
                    <span className="block text-sm font-bold text-primary">₹150</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">60 Minutes • Comprehensive Analysis</div>
                </div>
              </label>
              <label 
                onClick={() => setService('followup')}
                className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-sm ${service === 'followup' ? 'border-primary bg-primary/5 dark:bg-primary/20' : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-surface-dark'}`}
              >
                <input type="radio" checked={service === 'followup'} readOnly className="h-4 w-4 text-primary border-gray-300 focus:ring-primary" />
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="block text-sm font-semibold text-slate-900 dark:text-white">Follow-up Session</span>
                    <span className="block text-sm font-bold text-primary">₹85</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">30 Minutes • Progress Check</div>
                </div>
              </label>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col md:flex-row">
              {/* Calendar */}
              <div className="p-6 md:w-7/12 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-700">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-semibold text-slate-900 dark:text-white">October 2023</h4>
                  <div className="flex space-x-2">
                    <button className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-500 transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center text-sm mb-2">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <span key={day} className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">{day}</span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-y-2 gap-x-2 text-center text-sm">
                  {[...Array(2)].map((_, i) => <span key={`empty-${i}`} className="p-2"></span>)}
                  {[...Array(30)].map((_, i) => {
                    const day = i + 1;
                    const isAvailable = day >= 6;
                    const isSelected = selectedDate === day;
                    return (
                      <button 
                        key={day}
                        disabled={!isAvailable}
                        onClick={() => setSelectedDate(day)}
                        className={`p-2 rounded-full transition-all ${
                          isSelected 
                            ? 'bg-primary text-white shadow-md shadow-primary/30 font-medium' 
                            : isAvailable 
                              ? 'text-slate-700 dark:text-slate-300 hover:bg-primary/10 hover:text-primary' 
                              : 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="p-6 md:w-5/12 bg-slate-50/50 dark:bg-slate-800/50 flex flex-col">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Available Times</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Tuesday, Oct {selectedDate}th</p>
                <div className="overflow-y-auto pr-2 no-scrollbar flex-1 space-y-2">
                  {timeSlots.map((time) => (
                    <button 
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex justify-between group ${
                        selectedTime === time 
                          ? 'border-primary bg-primary/5 dark:bg-primary/20 text-primary font-medium' 
                          : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-surface-dark text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary'
                      }`}
                    >
                      <span>{time}</span>
                      <CheckCircle className={`w-4 h-4 transition-opacity ${selectedTime === time ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                    </button>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600">
                  {paymentDone ? (
                    <div className="flex items-center justify-center gap-2 py-3 text-primary font-medium">
                      <CheckCircle className="w-5 h-5" />
                      Slot confirmed! We'll send you a reminder.
                    </div>
                  ) : bookingConfirmed ? (
                    <form onSubmit={handlePay} className="space-y-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="text-xs text-slate-500 dark:text-slate-400">Secure payment • Demo mode</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300">Pay {formatPrice(amount)}</p>
                      <div className="space-y-1.5">
                        {[
                          { id: 'card' as const, label: 'Credit / Debit Card', icon: CreditCard },
                          { id: 'upi' as const, label: 'UPI', icon: Smartphone },
                          { id: 'cod' as const, label: 'Pay at Clinic', icon: CheckCircle },
                        ].map((m) => (
                          <label
                            key={m.id}
                            className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                              paymentMethod === m.id
                                ? 'border-primary bg-primary/5 dark:bg-primary/10'
                                : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={m.id}
                              checked={paymentMethod === m.id}
                              onChange={() => setPaymentMethod(m.id)}
                              className="sr-only"
                            />
                            <m.icon className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-slate-900 dark:text-white">{m.label}</span>
                          </label>
                        ))}
                      </div>
                      {paymentMethod === 'card' && (
                        <div className="space-y-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                          <input
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                            placeholder="Card number (16 digits)"
                            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              value={expiry}
                              onChange={(e) => {
                                let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                                if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2);
                                setExpiry(v);
                              }}
                              placeholder="MM/YY"
                              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary"
                            />
                            <input
                              type="password"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                              placeholder="CVV"
                              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary"
                            />
                          </div>
                        </div>
                      )}
                      {paymentMethod === 'upi' && (
                        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                          <input
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="name@paytm / name@phonepe"
                            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      )}
                      {paymentMethod === 'cod' && (
                        <p className="text-xs text-slate-600 dark:text-slate-400">Pay when you visit the clinic.</p>
                      )}
                      {paymentError && <p className="text-red-500 text-xs">{paymentError}</p>}
                      <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-primary text-white py-3 rounded-lg font-medium shadow-lg shadow-primary/30 hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {processing ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>Pay {formatPrice(amount)}</>
                        )}
                      </button>
                    </form>
                  ) : (
                    <button 
                      onClick={handleConfirmSlot}
                      className="w-full bg-primary text-white py-3 rounded-lg font-medium shadow-lg shadow-primary/30 hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                    >
                      Confirm Slot
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Have a Quick Question?</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Not sure if Ayurvedic treatment is right for you? Ask us anything.</p>
                </div>
              </div>
              <form className="bg-white dark:bg-surface-dark p-6 md:p-8 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">Name</label>
                    <input className="w-full rounded-lg border border-slate-200 dark:border-slate-500 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/30 focus:border-primary text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 text-sm p-3 transition-colors" placeholder="Your full name" type="text" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">Email</label>
                    <input className="w-full rounded-lg border border-slate-200 dark:border-slate-500 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/30 focus:border-primary text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 text-sm p-3 transition-colors" placeholder="you@example.com" type="email" />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">Message</label>
                  <textarea className="w-full rounded-lg border border-slate-200 dark:border-slate-500 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/30 focus:border-primary text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 text-sm p-3 transition-colors resize-none" placeholder="Describe your concern briefly..." rows={3}></textarea>
                </div>
                <div className="flex justify-end">
                  <button className="text-primary hover:text-white border border-primary hover:bg-primary font-medium rounded-lg text-sm px-6 py-2.5 text-center transition-all" type="button">Send Inquiry</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
