import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, User, Heart, Eye } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { ImageWithFallback } from './ImageWithFallback';

interface BlogProps {
  onPostClick: (postId: string) => void;
}

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const Blog = ({ onPostClick }: BlogProps) => {
  const { posts, isLiked, toggleLike, getLikeCount, getViewCount } = useBlog();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary font-semibold uppercase tracking-wider text-xs sm:text-sm">Knowledge Hub</span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mt-2 mb-3">Articles & Studies</h1>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300">
              Expert insights on Ayurveda, holistic health, and evidence-based wellness from our practitioners.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-10 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => onPostClick(post.id)}
                className="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-slate-100 dark:border-slate-700 hover:border-primary/30"
              >
                <div className="h-48 overflow-hidden relative">
                  <ImageWithFallback
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={post.image}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 text-xs font-medium text-slate-700 dark:text-slate-200">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(post.publishedAt)}
                    </span>
                    {post.readTime && <span>{post.readTime}</span>}
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {getViewCount(post.id)} views
                    </span>
                    <button
                      type="button"
                      className="flex items-center gap-1 ml-auto hover:text-red-500 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(post.id);
                      }}
                      aria-label={isLiked(post.id) ? 'Unlike' : 'Like'}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${isLiked(post.id) ? 'fill-red-500 text-red-500' : ''}`}
                      />
                      {getLikeCount(post.id)}
                    </button>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-primary font-medium text-sm mt-4 group-hover:gap-3 transition-all">
                    Read article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
