/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  Outlet,
  useNavigate,
  useLocation,
  useParams,
} from 'react-router-dom';
import { Navbar, Footer } from './components/Layout';
import { Home } from './components/Home';
import { Shop } from './components/Shop';
import { Booking } from './components/Booking';
import { ProductDetail } from './components/ProductDetail';
import { TreatmentDetail } from './components/TreatmentDetail';
import { Contact } from './components/Contact';
import { About } from './components/About';
import { Services } from './components/Services';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { Payment } from './components/Payment';
import { OrderSuccess } from './components/OrderSuccess';
import { OrderHistory } from './components/OrderHistory';
import { Blog } from './components/Blog';
import { BlogPostDetail } from './components/BlogPostDetail';
import { Login } from './components/Login';
import { useCart } from './context/CartContext';
import { useBlog } from './context/BlogContext';
import { useOrders } from './context/OrderContext';
import { PRODUCTS, TREATMENTS } from './constants';

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className='min-h-screen flex flex-col font-sans bg-background-light dark:bg-background-dark transition-colors duration-300'>
      <Navbar
        currentPath={location.pathname}
        onNavigate={(path) => navigate(path)}
        onOpenCart={() => navigate('/cart')}
      />
      <main className='grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function AppContent() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route
          index
          element={
            <Home
              onStartJourney={() => navigate('/booking')}
              onExploreShop={() => navigate('/shop')}
              onViewServices={() => navigate('/services')}
              onTreatmentClick={(id) => navigate(`/services/${id}`)}
            />
          }
        />
        <Route
          path='about'
          element={<About onBookConsultation={() => navigate('/booking')} />}
        />
        <Route
          path='services'
          element={
            <Services
              onTreatmentClick={(id) => navigate(`/services/${id}`)}
              onBookConsultation={() => navigate('/booking')}
            />
          }
        />
        <Route
          path='services/:treatmentId'
          element={<TreatmentDetailWrapper />}
        />
        <Route path='contact' element={<Contact />} />
        <Route
          path='blog'
          element={
            <Blog onPostClick={(id) => navigate(`/blog/${id}`)} />
          }
        />
        <Route
          path='blog/:postId'
          element={<BlogPostDetailWrapper />}
        />
        <Route
          path='shop'
          element={
            <Shop onProductClick={(id) => navigate(`/shop/product/${id}`)} />
          }
        />
        <Route
          path='shop/product/:productId'
          element={<ProductDetailWrapper />}
        />
        <Route
          path='orders'
          element={
            <OrderHistory
              onGoToShop={() => navigate('/shop')}
              onProductClick={(id) => navigate(`/shop/product/${id}`)}
            />
          }
        />
        <Route path='login' element={<Login onSuccess={() => navigate('/')} onBack={() => navigate(-1)} />} />
        <Route path='booking' element={<Booking />} />
        <Route
          path='cart'
          element={
            <Cart
              onBack={() => navigate('/shop')}
              onCheckout={() => navigate('/checkout')}
            />
          }
        />
        <Route
          path='checkout'
          element={
            <Checkout
              onBack={() => navigate('/cart')}
              onPayment={(data) =>
                navigate('/payment', { state: { orderData: data } })
              }
            />
          }
        />
        <Route path='payment' element={<PaymentWrapper />} />
        <Route path='order-success' element={<OrderSuccessWrapper />} />
      </Route>
    </Routes>
  );
}

function TreatmentDetailWrapper() {
  const { treatmentId } = useParams();
  const treatment = TREATMENTS.find((t) => t.id === treatmentId);
  const navigate = useNavigate();

  if (!treatment)
    return <div className='pt-20 text-center'>Treatment not found</div>;
  return (
    <TreatmentDetail
      treatment={treatment}
      onBack={() => navigate('/services')}
      onBookConsultation={() => navigate('/booking')}
    />
  );
}

function BlogPostDetailWrapper() {
  const { postId } = useParams();
  const { getPost } = useBlog();
  const post = postId ? getPost(postId) : undefined;
  const navigate = useNavigate();

  if (!post)
    return <div className='pt-20 text-center'>Article not found</div>;
  return <BlogPostDetail post={post} onBack={() => navigate('/blog')} />;
}

function ProductDetailWrapper() {
  const { productId } = useParams();
  const product = PRODUCTS.find((p) => p.id === productId);
  const navigate = useNavigate();

  if (!product)
    return <div className='pt-20 text-center'>Product not found</div>;
  return <ProductDetail product={product} onBack={() => navigate('/shop')} />;
}

function PaymentWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderData } =
    (location.state as {
      orderData?: import('./components/Checkout').OrderData;
    }) || {};
  const { items: cartItems, clearCart } = useCart();
  const { addOrder } = useOrders();

  if (!orderData)
    return (
      <div className='pt-20 text-center'>
        Invalid session.{' '}
        <button onClick={() => navigate('/shop')}>Go to Shop</button>
      </div>
    );

  return (
    <Payment
      orderData={orderData}
      onBack={() => navigate('/checkout', { state: { orderData } })}
      onSuccess={() => {
        const orderItems = cartItems
          .map((item) => {
            const product = PRODUCTS.find((p) => p.id === item.productId);
            return product
              ? {
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: item.quantity,
                  image: product.image,
                }
              : null;
          })
          .filter(Boolean) as {
          productId: string;
          name: string;
          price: number;
          quantity: number;
          image: string;
        }[];
        const order = addOrder({
          items: orderItems,
          subtotal: orderData.subtotal,
          shipping: orderData.shipping,
          total: orderData.total,
          name: orderData.name,
          phone: orderData.phone,
          email: orderData.email,
          address: orderData.address,
          city: orderData.city,
          pincode: orderData.pincode,
        });
        clearCart();
        navigate('/order-success', { state: { orderData, orderId: order.id } });
      }}
    />
  );
}

function OrderSuccessWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderData, orderId } =
    (location.state as {
      orderData?: import('./components/Checkout').OrderData;
      orderId?: string;
    }) || {};

  if (!orderData || !orderId)
    return (
      <div className='pt-20 text-center'>
        Invalid session.{' '}
        <button onClick={() => navigate('/shop')}>Go to Shop</button>
      </div>
    );

  return (
    <OrderSuccess
      orderId={orderId}
      orderData={orderData}
      onContinueShopping={() => navigate('/shop')}
      onViewOrders={() => navigate('/orders')}
      onOrderCancelled={() => navigate('/shop')}
    />
  );
}

export default function App() {
  return <AppContent />;
}
