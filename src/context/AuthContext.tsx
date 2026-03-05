import { useAppDispatch, useAppSelector } from '../store/hooks';
import { sendOTP as sendOTPThunk, verifyOTP as verifyOTPThunk, logout as logoutAction } from '../store/slices/authSlice';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const useAuth = () => {
  const { user, isLoading } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();

  const sendOTP = async (phone: string) => {
    const result = await dispatch(sendOTPThunk(phone)).unwrap();
    return result;
  };

  const verifyOTP = async (phone: string, otp: string) => {
    const result = await dispatch(verifyOTPThunk({ phone, otp })).unwrap();
    return result;
  };

  const logout = () => dispatch(logoutAction());

  return {
    user,
    isAuthenticated: !!user,
    sendOTP,
    verifyOTP,
    logout,
    isLoading,
  };
};
