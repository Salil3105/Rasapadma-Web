import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AUTH_STORAGE_KEY = 'drveda-auth';

interface User {
  phone: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  sendOTP: (phone: string) => Promise<{ success: boolean; error?: string }>;
  verifyOTP: (phone: string, otp: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo OTP - in production, replace with real SMS API (Twilio, MSG91, Firebase, etc.)
const DEMO_OTP = '1234';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as User;
        if (parsed?.phone) setUser(parsed);
      }
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, []);

  const persistUser = useCallback((u: User) => {
    setUser(u);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(u));
  }, []);

  const sendOTP = useCallback(async (phone: string): Promise<{ success: boolean; error?: string }> => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length !== 10) {
      return { success: false, error: 'Enter a valid 10-digit mobile number' };
    }
    if (!/^[6-9]\d{9}$/.test(cleaned)) {
      return { success: false, error: 'Mobile number must start with 6, 7, 8 or 9' };
    }

    setIsLoading(true);
    try {
      // TODO: Replace with real API call to your backend
      // await fetch('/api/auth/send-otp', { method: 'POST', body: JSON.stringify({ phone: cleaned }) });
      await new Promise((r) => setTimeout(r, 800)); // Simulate network delay
      // Store phone temporarily for verification (in real app, backend handles this)
      sessionStorage.setItem('drveda-otp-phone', cleaned);
      return { success: true };
    } catch {
      return { success: false, error: 'Failed to send OTP. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyOTP = useCallback(async (phone: string, otp: string): Promise<{ success: boolean; error?: string }> => {
    const cleanedPhone = phone.replace(/\D/g, '');
    const cleanedOtp = otp.replace(/\D/g, '');

    if (cleanedPhone.length !== 10) {
      return { success: false, error: 'Invalid mobile number' };
    }
    if (cleanedOtp.length !== 4) {
      return { success: false, error: 'Enter 4-digit OTP' };
    }

    const storedPhone = sessionStorage.getItem('drveda-otp-phone');
    if (storedPhone !== cleanedPhone) {
      return { success: false, error: 'Session expired. Please request OTP again.' };
    }

    setIsLoading(true);
    try {
      // TODO: Replace with real API call
      // const res = await fetch('/api/auth/verify-otp', { method: 'POST', body: JSON.stringify({ phone: cleanedPhone, otp: cleanedOtp }) });
      await new Promise((r) => setTimeout(r, 600));
      if (cleanedOtp !== DEMO_OTP) {
        return { success: false, error: 'Invalid OTP. Use 1234 for demo.' };
      }
      sessionStorage.removeItem('drveda-otp-phone');
      persistUser({ phone: `+91 ${cleanedPhone}` });
      return { success: true };
    } catch {
      return { success: false, error: 'Verification failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  }, [persistUser]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem('drveda-otp-phone');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        sendOTP,
        verifyOTP,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
