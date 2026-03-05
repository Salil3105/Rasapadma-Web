import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Heart,
  Eye,
  Share2,
} from 'lucide-react';
import { BlogPost } from '../constants';
import { useBlog } from '../context/BlogContext';
import { ImageWithFallback } from './ImageWithFallback';

interface BlogPostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

function renderContent(text?: string) {
  if (!text) return null;

  return text.split('\n\n').map((para, i) => {
    const parts = para.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p
        key={i}
        className='mb-4 text-slate-600 dark:text-slate-300 leading-relaxed'
      >
        {parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**') ? (
            <strong
              key={j}
              className='text-slate-800 dark:text-slate-200 font-semibold'
            >
              {part.slice(2, -2)}
            </strong>
          ) : (
            part
          ),
        )}
      </p>
    );
  });
}

async function shareArticle(title: string, url: string) {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        url,
        text: `Check out this article: ${title}`,
      });
    } catch (err) {
      if ((err as Error).name !== 'AbortError') copyToClipboard(url);
    }
  } else {
    copyToClipboard(url);
  }
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    if (typeof document !== 'undefined') {
      const toast = document.createElement('div');
      toast.textContent = 'Link copied!';
      toast.className =
        'fixed bottom-4 right-4 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm z-50';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    }
  });
}

export const BlogPostDetail = ({ post, onBack }: BlogPostDetailProps) => {
  const { isLiked, toggleLike, getLikeCount, getViewCount, incrementView } =
    useBlog();

  useEffect(() => {
    incrementView(post.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.id]);

  const handleShare = () => {
    const url = `${window.location.origin}/blog/${post.id}`;
    shareArticle(post.title, url);
  };

  return (
    <div className='pt-20'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12'>
        <button
          onClick={onBack}
          className='flex items-center gap-2 text-slate-600 dark:text-slate-200 hover:text-primary mb-8 transition-colors'
        >
          <ArrowLeft className='w-4 h-4' />
          Back to Articles
        </button>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className='bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden'
        >
          <div className='relative h-64 md:h-80 overflow-hidden'>
            <ImageWithFallback
              src={post.image}
              alt={post.title}
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />
            <div className='absolute bottom-0 left-0 right-0 p-8'>
              <span className='inline-block px-3 py-1 rounded-full bg-primary/90 text-white text-sm font-medium mb-3'>
                {post.category}
              </span>
              <h1 className='text-3xl md:text-4xl font-bold text-white'>
                {post.title}
              </h1>
              <div className='flex flex-wrap items-center gap-4 mt-4 text-white/90 text-sm'>
                <span className='flex items-center gap-2'>
                  <User className='w-4 h-4' />
                  {post.author}
                  {post.authorTitle && (
                    <span className='text-white/70'>• {post.authorTitle}</span>
                  )}
                </span>
                <span className='flex items-center gap-2'>
                  <Calendar className='w-4 h-4' />
                  {formatDate(post.publishedAt)}
                </span>
                {post.readTime && (
                  <span className='flex items-center gap-2'>
                    <Clock className='w-4 h-4' />
                    {post.readTime}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className='p-8 md:p-10'>
            <div className='flex flex-wrap items-center gap-4 pb-6 mb-6 border-b border-slate-200 dark:border-slate-600'>
              <button
                type='button'
                onClick={handleShare}
                className='flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-primary/50 transition-colors'
              >
                <Share2 className='w-4 h-4' />
                Share
              </button>
              <button
                type='button'
                onClick={() => toggleLike(post.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  isLiked(post.id)
                    ? 'border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                    : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${isLiked(post.id) ? 'fill-current' : ''}`}
                />
                {getLikeCount(post.id)} Likes
              </button>
              <span className='flex items-center gap-2 px-4 py-2 text-slate-500 dark:text-slate-400'>
                <Eye className='w-4 h-4' />
                {getViewCount(post.id)} views
              </span>
            </div>
            <div className='prose prose-slate dark:prose-invert max-w-none'>
              {renderContent(post.content)}
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
};
