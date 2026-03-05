import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const AUTH_STORAGE_KEY = 'drveda-auth';
const DEMO_OTP = '1234';

export interface User {
  phone: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

const loadUser = (): User | null => {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as User;
      if (parsed?.phone) return parsed;
    }
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
  return null;
};

export const sendOTP = createAsyncThunk<
  { success: boolean; error?: string },
  string
>('auth/sendOTP', async (phone: string) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length !== 10) {
    return { success: false, error: 'Enter a valid 10-digit mobile number' };
  }
  if (!/^[6-9]\d{9}$/.test(cleaned)) {
    return { success: false, error: 'Mobile number must start with 6, 7, 8 or 9' };
  }
  await new Promise((r) => setTimeout(r, 800));
  sessionStorage.setItem('drveda-otp-phone', cleaned);
  return { success: true };
});

export const verifyOTP = createAsyncThunk<
  { success: boolean; error?: string; user?: User },
  { phone: string; otp: string }
>('auth/verifyOTP', async ({ phone, otp }) => {
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

  await new Promise((r) => setTimeout(r, 600));
  if (cleanedOtp !== DEMO_OTP) {
    return { success: false, error: 'Invalid OTP. Use 1234 for demo.' };
  }
  sessionStorage.removeItem('drveda-otp-phone');
  const user: User = { phone: `+91 ${cleanedPhone}` };
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  return { success: true, user };
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: loadUser(), isLoading: false } as AuthState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem(AUTH_STORAGE_KEY);
      sessionStorage.removeItem('drveda-otp-phone');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendOTP.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(sendOTP.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success && action.payload.user) {
          state.user = action.payload.user;
        }
      })
      .addCase(verifyOTP.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
