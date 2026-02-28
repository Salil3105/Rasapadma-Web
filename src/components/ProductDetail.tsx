import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Star, ShoppingCart, Verified } from 'lucide-react';
import { Product } from '../constants';
import { ImageWithFallback } from './ImageWithFallback';
import { useCart } from '../context/CartContext';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetail = ({ product, onBack }: ProductDetailProps) => {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addToCart(product.id);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="pt-14 sm:pt-16 lg:pt-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary mb-4 sm:mb-5 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          Back to Shop
        </button>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-white dark:bg-surface-dark rounded-xl sm:rounded-2xl shadow-md border border-gray-100 dark:border-slate-700 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 p-4 sm:p-5 lg:p-8">
            {/* Product Image - object-contain ensures full image visible at all resolutions */}
            <div className="relative flex items-center justify-center aspect-[4/3] sm:aspect-square rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800/50">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
              {product.tag && (
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-primary text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full uppercase tracking-wide">
                  {product.tag}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <span className="text-primary text-xs font-semibold bg-primary/10 px-2 py-0.5 rounded w-fit mb-2">
                {product.category}
              </span>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">{product.name}</h1>
              <div className="flex items-center gap-1.5 text-yellow-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                  />
                ))}
                <span className="text-gray-500 text-xs sm:text-sm ml-1">({product.reviews} reviews)</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</p>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-5">{product.description}</p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 sm:py-3.5 px-5 rounded-xl font-medium text-sm sm:text-base transition-colors ${
                    addedToCart
                      ? 'bg-primary text-white'
                      : 'bg-gray-900 text-white hover:bg-primary'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                  {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                </button>
              </div>

              <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-gray-100 dark:border-slate-600">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-primary/10 rounded-full shrink-0">
                    <Verified className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base mb-0.5">Doctor Verified</h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      Formulated and tested by Dr. Veda (MD, BAMS). 100% natural ingredients sourced from certified organic farms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
