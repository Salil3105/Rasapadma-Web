import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, Grid, List, Star, Heart, ShoppingCart, UserCheck, Flower2, Stethoscope, Verified, ArrowRight, SlidersHorizontal, X } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { ImageWithFallback } from './ImageWithFallback';
import { useCart } from '../context/CartContext';
import doctor from '../content/doctor.json';

interface ShopProps {
  onProductClick?: (productId: string) => void;
}

const formatPrice = (amount: number) => `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

const ITEMS_PER_PAGE = 6;

export const Shop = ({ onProductClick }: ShopProps) => {
  const { addToCart, getQuantity } = useCart();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(100);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const handleAddToCart = (productId: string) => {
    addToCart(productId);
    setAddedToCart(productId);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const filteredProducts = PRODUCTS.filter(
    p => (selectedCategories.length === 0 || selectedCategories.includes(p.category)) &&
         p.price >= minPrice && p.price <= maxPrice
  );

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, minPrice, maxPrice]);

  const goToPage = (page: number) => {
    const pageNum = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNum);
    document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  const resultsLabel = selectedCategories.length === 0
    ? 'All categories'
    : selectedCategories.length === 1
      ? selectedCategories[0]
      : `${selectedCategories.length} categories`;

  const categories = [
    'Digestive Health',
    'Immunity Boosters',
    'Skin & Hair Care',
    'Stress & Sleep',
    'Detox & Cleanse'
  ];

  return (
    <div className="pt-14 sm:pt-16 lg:pt-20">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-slate-50 via-primary/5 to-slate-50 dark:from-slate-900/50 dark:via-slate-800/40 dark:to-slate-900/50 border-b border-gray-100 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="max-w-xl">
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-slate-600 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5"></span>
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-slate-400">Doctor Formulated</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Natural Healing, <br /><span className="text-primary">Backed by Science</span></h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-slate-300 mb-4">{doctor.productTagline}</p>
            <button 
              onClick={() => document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors shadow-md sm:shadow-lg shadow-primary/20 inline-flex items-center gap-1.5 w-fit"
            >
              Explore Best Sellers
            </button>
          </div>
          <div className="relative w-full md:w-1/3 h-64 md:h-80 rounded-xl overflow-hidden shadow-xl">
            <ImageWithFallback 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
              src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80"
              alt="Featured collection"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="font-medium text-sm opacity-90">Featured Collection</p>
              <p className="font-bold text-lg">Stress & Sleep Recovery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Filters - Desktop: always visible | Mobile/Tablet: in drawer */}
          <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0 space-y-5">
            <div className="relative">
              <input 
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-surface-dark text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400" 
                placeholder="Search remedies..." 
                type="text" 
              />
              <Search className="absolute left-2.5 top-2.5 text-gray-400 w-4 h-4" />
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-2">Categories</h3>
              <div className="space-y-1.5">
                {categories.map((category) => (
                  <label key={category} className="flex items-center group cursor-pointer py-0.5">
                    <input 
                      type="checkbox" 
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="rounded border-gray-300 dark:border-slate-600 text-primary focus:ring-primary bg-white dark:bg-surface-dark h-4 w-4 cursor-pointer accent-primary" 
                    />
                    <span className={`ml-2 text-sm transition-colors ${selectedCategories.includes(category) ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-600 dark:text-slate-300 group-hover:text-primary'}`}>
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-2">Price Range</h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 flex items-center rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-surface-dark overflow-hidden focus-within:ring-2 focus-within:ring-primary/30">
                  <span className="pl-2 text-gray-500 dark:text-slate-400 text-xs">₹</span>
                  <input
                    type="number"
                    min={10}
                    max={maxPrice}
                    value={minPrice}
                    onChange={(e) => setMinPrice(Math.min(Number(e.target.value) || 10, maxPrice - 1))}
                    className="flex-1 px-1.5 py-2 text-xs text-gray-900 dark:text-white bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <span className="text-gray-400 dark:text-slate-500 text-xs">–</span>
                <div className="flex-1 flex items-center rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-surface-dark overflow-hidden focus-within:ring-2 focus-within:ring-primary/30">
                  <span className="pl-2 text-gray-500 dark:text-slate-400 text-xs">₹</span>
                  <input
                    type="number"
                    min={minPrice}
                    max={500}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Math.max(Number(e.target.value) || 100, minPrice + 1))}
                    className="flex-1 px-1.5 py-2 text-xs text-gray-900 dark:text-white bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
              <input
                type="range"
                min={minPrice}
                max={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <p className="text-[10px] text-gray-500 dark:text-slate-400 mt-0.5">₹{minPrice} – ₹{maxPrice}</p>
            </div>

            <div className="bg-primary/5 dark:bg-primary/10 p-3 rounded-lg border border-primary/10 dark:border-slate-600">
              <div className="flex items-start gap-2">
                <UserCheck className="text-primary w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-xs mb-0.5">Doctor's Tip</h4>
                  <p className="text-[11px] text-gray-600 dark:text-slate-300 leading-snug">
                    "For best results with immunity boosters, consume with warm water or honey first thing in the morning."
                  </p>
                  <p className="text-[10px] text-primary font-medium mt-1">{doctor.doctorTipSignature}</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile/Tablet Filters Drawer */}
          <AnimatePresence>
            {filtersOpen && (
              <>
                <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setFiltersOpen(false)} />
                <motion.aside
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  className="fixed top-0 right-0 bottom-0 w-[min(320px,90vw)] z-50 lg:hidden bg-white dark:bg-surface-dark shadow-xl overflow-y-auto"
                >
                  <div className="sticky top-0 flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Filters</h3>
                    <button onClick={() => setFiltersOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4 space-y-5">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-2">Categories</h4>
                      <div className="space-y-1.5">
                        {categories.map((category) => (
                          <label key={category} className="flex items-center group cursor-pointer py-0.5">
                            <input 
                              type="checkbox" 
                              checked={selectedCategories.includes(category)}
                              onChange={() => toggleCategory(category)}
                              className="rounded border-gray-300 dark:border-slate-600 text-primary focus:ring-primary h-4 w-4 cursor-pointer accent-primary" 
                            />
                            <span className={`ml-2 text-sm ${selectedCategories.includes(category) ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-600 dark:text-slate-300'}`}>
                              {category}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-2">Price Range</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 flex items-center rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-surface-dark overflow-hidden">
                          <span className="pl-2 text-gray-500 dark:text-slate-400 text-xs">₹</span>
                          <input
                            type="number"
                            min={10}
                            max={maxPrice}
                            value={minPrice}
                            onChange={(e) => setMinPrice(Math.min(Number(e.target.value) || 10, maxPrice - 1))}
                            className="flex-1 px-1.5 py-2 text-sm text-gray-900 dark:text-white bg-transparent focus:outline-none [appearance:textfield]"
                          />
                        </div>
                        <span className="text-gray-400 dark:text-slate-500 text-xs">–</span>
                        <div className="flex-1 flex items-center rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-surface-dark overflow-hidden">
                          <span className="pl-2 text-gray-500 dark:text-slate-400 text-xs">₹</span>
                          <input
                            type="number"
                            min={minPrice}
                            max={500}
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Math.max(Number(e.target.value) || 100, minPrice + 1))}
                            className="flex-1 px-1.5 py-2 text-sm text-gray-900 dark:text-white bg-transparent focus:outline-none [appearance:textfield]"
                          />
                        </div>
                      </div>
                      <input
                        type="range"
                        min={minPrice}
                        max={500}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full h-2 accent-primary"
                      />
                      <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">₹{minPrice} – ₹{maxPrice}</p>
                    </div>
                    <div className="bg-primary/5 dark:bg-primary/10 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <UserCheck className="text-primary w-4 h-4 mt-0.5 shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white text-xs mb-0.5">Doctor's Tip</h4>
                          <p className="text-[11px] text-gray-600 dark:text-slate-300 leading-snug">
                            "For best results with immunity boosters, consume with warm water or honey first thing in the morning."
                          </p>
                          <p className="text-[10px] text-primary font-medium mt-1">{doctor.doctorTipSignature}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Product Grid Area */}
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-5 sm:mb-6 gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-surface-dark text-sm font-medium text-gray-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
                <p className="text-gray-500 dark:text-slate-400 text-sm">Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredProducts.length}</span> results for "{resultsLabel}"</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-1 bg-white dark:bg-surface-dark p-1 rounded-lg border border-gray-200 dark:border-slate-600">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-primary/10 text-primary' : 'text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div id="product-grid" className={`grid gap-4 sm:gap-5 lg:gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {paginatedProducts.map((product) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => onProductClick?.(product.id)}
                  className={`bg-white dark:bg-surface-dark rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-slate-700 overflow-hidden flex flex-col group cursor-pointer ${viewMode === 'list' ? 'flex-row' : ''}`}
                >
                  <div className={`relative bg-background-light dark:bg-slate-800 overflow-hidden shrink-0 ${viewMode === 'grid' ? 'pt-[70%]' : 'w-40 sm:w-48 h-40 sm:h-48'}`}>
                    <ImageWithFallback 
                      className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      src={product.image}
                      alt={product.name}
                    />
                    {product.tag && (
                      <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap">
                        {product.tag}
                      </div>
                    )}
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                    >
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className={`flex-1 flex flex-col min-w-0 p-3 sm:p-4 ${viewMode === 'list' ? 'justify-center py-3 sm:py-4' : ''}`}>
                    <span className="text-primary text-[11px] sm:text-xs font-semibold bg-primary/10 px-1.5 py-0.5 rounded whitespace-nowrap inline-block w-fit mb-1.5">
                      {product.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-0.5 group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 line-clamp-2 mb-2 flex-shrink-0">
                      {product.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-2 border-t border-gray-100 dark:border-slate-600">
                      <div className="min-w-0 flex-1">
                        <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-white block">{formatPrice(product.price)}</span>
                        <div className="flex items-center gap-1 text-yellow-400 text-[10px] sm:text-xs mt-0.5 flex-wrap">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                          ))}
                          <span className="text-gray-400 shrink-0">({product.reviews})</span>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product.id);
                        }}
                        className={`shrink-0 p-2 sm:p-2.5 rounded-lg transition-all duration-300 flex items-center justify-center ${
                          addedToCart === product.id 
                            ? 'bg-primary text-white shadow-lg shadow-primary/40 ring-2 ring-primary/30' 
                            : 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 active:scale-95'
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                        {addedToCart === product.id && <span className="text-[10px] sm:text-xs font-medium whitespace-nowrap hidden sm:inline">Added!</span>}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center gap-1.5">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-8 h-8 rounded-md flex items-center justify-center border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-gray-600 dark:text-slate-200 hover:border-primary hover:text-primary text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i + 1)}
                      className={`w-8 h-8 rounded-md text-sm font-medium flex items-center justify-center transition-colors ${
                        currentPage === i + 1
                          ? 'bg-primary text-white shadow-sm'
                          : 'border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-gray-700 dark:text-slate-200 hover:border-primary hover:text-primary'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 rounded-md flex items-center justify-center border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-gray-600 dark:text-slate-200 hover:border-primary hover:text-primary text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </nav>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-gradient-to-b from-white to-primary/[0.03] dark:from-surface-dark dark:to-primary/5 border-t border-gray-100 dark:border-slate-700 py-10 sm:py-12 lg:py-14 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Flower2, title: '100% Natural Ingredients', desc: 'Sourced directly from certified organic farms.' },
              { icon: Stethoscope, title: 'Doctor Verified', desc: doctor.verifiedLine },
              { icon: Verified, title: 'GMP Certified', desc: 'Manufactured in certified, sterile facilities.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group flex flex-col items-center p-8 rounded-2xl bg-white dark:bg-background-dark/80 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg hover:shadow-primary/10 dark:hover:shadow-primary/20 hover:border-primary/20 dark:hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-5 group-hover:scale-110 group-hover:bg-primary/15 dark:group-hover:bg-primary/30 transition-all duration-300 shadow-inner">
                  <item.icon className="w-9 h-9" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed max-w-xs">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
