import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Leaf,
  Search,
  ShoppingBag,
  Menu,
  X,
  Facebook,
  Instagram,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Send,
  Star,
  Verified,
  School,
  Award,
  PlayCircle,
  CheckCircle,
  HelpCircle,
  Home,
  User,
  Sparkles,
  Calendar,
  Sun,
  Moon,
  ShoppingCart,
  Package,
  FileText,
  UserCircle,
  LogOut,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import clinic from '../content/clinic.json';

// --- Shared Components ---

const navItems = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'About', path: '/about', icon: User },
  { label: 'Services', path: '/services', icon: Sparkles },
  { label: 'Contact', path: '/contact', icon: MapPin },
  { label: 'Articles', path: '/blog', icon: FileText },
  { label: 'Shop', path: '/shop', icon: ShoppingBag },
  { label: 'My Orders', path: '/orders', icon: Package },
] as const;

export const Navbar = ({
  currentPath,
  onNavigate,
  onOpenCart,
}: {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenCart?: () => void;
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalCount } = useCart();
  const cartCount = getTotalCount();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className='fixed w-full z-50 transition-all duration-300 bg-white/80 dark:bg-background-dark/90 backdrop-blur-md border-b border-primary/10 dark:border-primary/20'>
        <div className='max-w-7xl mx-auto px-2 min-[375px]:px-3 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-14 min-[375px]:h-16 sm:h-20 gap-1 min-[375px]:gap-2'>
            <NavLink
              to='/'
              className='flex-shrink-0 min-w-0 flex items-center gap-1 min-[375px]:gap-1.5 sm:gap-2 cursor-pointer'
            >
              <Leaf className='text-primary w-5 h-5 min-[375px]:w-6 min-[375px]:h-6 sm:w-8 sm:h-8 shrink-0' />
              <span className='font-bold text-sm min-[375px]:text-base sm:text-xl tracking-tight text-slate-900 dark:text-white truncate max-w-[140px] min-[375px]:max-w-[180px] sm:max-w-none'>
                {clinic.brandShort}{' '}
                <span className='text-primary font-normal'>{clinic.brandSuffix}</span>
              </span>
            </NavLink>
            <div className='hidden lg:flex items-center space-x-5 xl:space-x-6'>
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-primary'
                      : 'text-slate-600 dark:text-slate-300 hover:text-primary'
                  }`}
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink
                to='/booking'
                className='ml-2 px-4 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors shrink-0'
              >
                Book Consultation
              </NavLink>
            </div>
            <div className='flex items-center gap-1 sm:gap-2 shrink-0'>
              {onOpenCart && (
                <button
                  onClick={onOpenCart}
                  className='relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80 hover:text-primary transition-all shrink-0'
                  aria-label='Open cart'
                >
                  <ShoppingCart className='w-5 h-5' strokeWidth={2} />
                  {cartCount > 0 && (
                    <span className='absolute -top-0.5 -right-0.5 min-w-[20px] h-5 flex items-center justify-center rounded-full bg-primary text-white text-[11px] font-semibold px-1'>
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </button>
              )}
              <div className='w-px h-6 bg-slate-200 dark:bg-slate-600 hidden sm:block' aria-hidden />
              {isAuthenticated ? (
                <div className='relative hidden sm:block' ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen((o) => !o)}
                    className='flex items-center gap-2 pl-2 pr-3 py-2 rounded-full bg-slate-100/80 dark:bg-slate-700/50 hover:bg-slate-200/80 dark:hover:bg-slate-600/50 transition-colors border border-slate-200/60 dark:border-slate-600/50'
                    aria-label='Account menu'
                  >
                    <div className='w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center'>
                      <UserCircle className='w-4 h-4 text-primary' />
                    </div>
                    <span className='text-sm font-medium text-slate-700 dark:text-slate-200 max-w-[100px] truncate'>{user?.phone}</span>
                  </button>
                  {userMenuOpen && (
                    <div className='absolute right-0 top-full mt-2 py-1.5 w-56 bg-white dark:bg-surface-dark rounded-xl shadow-xl border border-slate-200 dark:border-slate-600 z-50 overflow-hidden'>
                      <div className='px-4 py-3 bg-slate-50/50 dark:bg-slate-800/50'>
                        <p className='text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-medium'>Signed in</p>
                        <p className='text-sm font-semibold text-slate-900 dark:text-white mt-0.5'>{user?.phone}</p>
                      </div>
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className='w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors'
                      >
                        <LogOut className='w-4 h-4 text-slate-400' />
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to='/login'
                  className='hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60 transition-all text-sm font-semibold'
                >
                  <UserCircle className='w-4 h-4' strokeWidth={2} />
                  Login
                </NavLink>
              )}
              <div className='w-px h-6 bg-slate-200 dark:bg-slate-600 hidden sm:block' aria-hidden />
              <button
                onClick={toggleTheme}
                className='flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-all shrink-0'
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <Sun className='w-5 h-5' strokeWidth={2} /> : <Moon className='w-5 h-5' strokeWidth={2} />}
              </button>
              <NavLink
                to='/booking'
                className='lg:hidden flex items-center justify-center gap-1 min-w-9 min-[375px]:min-w-[2.5rem] h-8 min-[375px]:h-9 sm:h-10 px-2 min-[375px]:px-2.5 sm:px-3 py-1.5 min-[375px]:py-2 rounded-full bg-primary text-white text-xs sm:text-sm font-medium hover:bg-primary-dark transition-colors shrink-0 overflow-visible'
                title='Book Consultation'
              >
                <Calendar className='w-3.5 h-3.5 min-[375px]:w-4 min-[375px]:h-4 shrink-0' strokeWidth={2} />
                <span className='hidden sm:inline'>Book Consultation</span>
                <span className='hidden min-[360px]:inline sm:hidden'>Book</span>
              </NavLink>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className='lg:hidden p-1.5 min-[375px]:p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shrink-0'
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? (
                  <X className='w-5 h-5 min-[375px]:w-6 min-[375px]:h-6' />
                ) : (
                  <Menu className='w-5 h-5 min-[375px]:w-6 min-[375px]:h-6' />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Professional Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 z-40 lg:hidden'
          >
            <div
              className='absolute inset-0 bg-black/30'
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className='absolute top-0 right-0 bottom-0 w-[min(85vw,320px)] bg-white dark:bg-surface-dark shadow-xl overflow-hidden flex flex-col'
            >
              {/* Header */}
              <div className='flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700 shrink-0'>
                <div className='flex items-center gap-2'>
                  <Leaf className='text-primary w-6 h-6' />
                  <span className='font-semibold text-slate-900 dark:text-white'>Menu</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className='p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors'
                  aria-label='Close menu'
                >
                  <X className='w-5 h-5' />
                </button>
              </div>

              {/* Navigation */}
              <nav className='flex-1 overflow-y-auto py-4 px-3'>
                <div className='space-y-0.5'>
                  {navItems.map((item) => {
                    const active = isActive(item.path);
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.label}
                        onClick={() => handleNavClick(item.path)}
                        className={`w-full flex items-center gap-3 py-3 px-3 rounded-lg text-left text-sm font-medium transition-colors ${
                          active
                            ? 'bg-primary/10 text-primary'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                        }`}
                      >
                        <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`} />
                        <span className='flex-1'>{item.label}</span>
                        {active && <div className='w-1.5 h-1.5 rounded-full bg-primary' />}
                      </button>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className='mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3'>
                  {isAuthenticated ? (
                    <div className='flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/50'>
                      <span className='text-sm font-medium text-slate-700 dark:text-slate-200 truncate'>{user?.phone}</span>
                      <button
                        onClick={() => { logout(); setMobileMenuOpen(false); }}
                        className='p-1.5 rounded text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                        aria-label='Logout'
                      >
                        <LogOut className='w-4 h-4' />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNavClick('/login')}
                      className='w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-primary text-primary hover:bg-primary/10 text-sm font-medium transition-colors'
                    >
                      <UserCircle className='w-5 h-5' />
                      Login
                    </button>
                  )}
                  {onOpenCart && (
                    <button
                      onClick={() => { onOpenCart?.(); setMobileMenuOpen(false); }}
                      className='w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-sm font-medium transition-colors'
                    >
                      <ShoppingCart className='w-5 h-5' />
                      Cart {cartCount > 0 && `(${cartCount})`}
                    </button>
                  )}
                  <button
                    onClick={() => handleNavClick('/booking')}
                    className='w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-primary text-white hover:bg-primary-dark text-sm font-semibold transition-colors'
                  >
                    <Calendar className='w-5 h-5' />
                    Book Consultation
                  </button>
                </div>
              </nav>

              {/* Footer */}
              <div className='px-5 py-3 border-t border-slate-200 dark:border-slate-700 shrink-0'>
                <p className='text-xs text-slate-400 dark:text-slate-500'>
                  {clinic.taglineMobile}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const Footer = () => {
  return (
    <footer className='bg-white dark:bg-surface-dark border-t border-slate-200 dark:border-slate-700 pt-10 sm:pt-12 lg:pt-14 pb-6 sm:pb-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10'>
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <Leaf className='text-primary w-5 h-5 sm:w-6 sm:h-6 shrink-0' />
              <span className='font-bold text-base sm:text-lg text-slate-900 dark:text-white'>
                {clinic.name}
              </span>
            </div>
            <p className='text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed'>
              {clinic.footerDescription}
            </p>
            <div className='flex gap-3 pt-1'>
              <Facebook className='w-4 h-4 sm:w-5 sm:h-5 text-slate-400 dark:text-slate-500 hover:text-primary cursor-pointer transition-colors' />
              <Instagram className='w-4 h-4 sm:w-5 sm:h-5 text-slate-400 dark:text-slate-500 hover:text-primary cursor-pointer transition-colors' />
              <MessageCircle className='w-4 h-4 sm:w-5 sm:h-5 text-slate-400 dark:text-slate-500 hover:text-primary cursor-pointer transition-colors' />
            </div>
          </div>
          <div>
            <h4 className='font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-3'>
              Quick Links
            </h4>
            <ul className='space-y-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400'>
              <li>
              <NavLink to='/about' className='hover:text-primary transition-colors'>
                  About Dr. Shalaka Chandwadkar
                </NavLink>
              </li>
              <li>
                <NavLink to='/services' className='hover:text-primary transition-colors'>
                  Our Services
                </NavLink>
              </li>
              <li>
                <NavLink to='/shop' className='hover:text-primary transition-colors'>
                  Wellness Shop
                </NavLink>
              </li>
              <li>
                <NavLink to='/booking' className='hover:text-primary transition-colors'>
                  Consultation FAQ
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-3'>
              Contact Us
            </h4>
            <ul className='space-y-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400'>
              <li className='flex items-start gap-2'>
                <MapPin className='text-primary w-4 h-4 mt-0.5 flex-shrink-0' />
                <span className='break-words'>
                  {clinic.address}
                </span>
              </li>
              <li className='flex items-center gap-2'>
                <Phone className='text-primary w-4 h-4 shrink-0' />
                <span>{clinic.phone}</span>
              </li>
              <li className='flex items-center gap-2'>
                <Mail className='text-primary w-4 h-4 shrink-0' />
                <span>{clinic.email}</span>
              </li>
            </ul>
          </div>
          <div className='sm:col-span-2 lg:col-span-1'>
            <h4 className='font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-3'>
              Health Tips
            </h4>
            <p className='text-xs text-slate-500 dark:text-slate-400 mb-3'>
              Subscribe to receive seasonal health tips and updates.
            </p>
            <form className='flex gap-2'>
              <input
                className='flex-1 min-w-0 px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:border-primary text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400'
                placeholder='Your email'
                type='email'
              />
              <button
                className='bg-primary text-white p-2 rounded-lg hover:bg-primary-dark transition-colors shrink-0'
                type='submit'
              >
                <Send className='w-4 h-4' />
              </button>
            </form>
          </div>
        </div>
        <div className='border-t border-slate-100 dark:border-slate-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left'>
          <p className='text-xs text-slate-400 dark:text-slate-500 order-2 sm:order-1'>
            {clinic.copyrightText}
          </p>
          <div className='flex gap-4 sm:gap-6 text-xs text-slate-400 dark:text-slate-500 order-1 sm:order-2'>
            <span className='hover:text-primary cursor-pointer transition-colors'>
              Privacy Policy
            </span>
            <span className='hover:text-primary cursor-pointer transition-colors'>
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
