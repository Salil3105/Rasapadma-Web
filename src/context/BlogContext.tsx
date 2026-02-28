import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { BLOG_POSTS } from '../constants';
import type { BlogPost } from '../constants';

const LIKES_KEY = 'drveda_blog_likes';
const LIKE_COUNTS_KEY = 'drveda_blog_like_counts';
const VIEWS_KEY = 'drveda_blog_views';

type BlogContextType = {
  posts: BlogPost[];
  getPost: (id: string) => BlogPost | undefined;
  isLiked: (postId: string) => boolean;
  toggleLike: (postId: string) => void;
  getLikeCount: (postId: string) => number;
  getViewCount: (postId: string) => number;
  incrementView: (postId: string) => void;
};

const BlogContext = createContext<BlogContextType | null>(null);

const loadLikes = (): string[] => {
  try {
    const raw = localStorage.getItem(LIKES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const loadLikeCounts = (): Record<string, number> => {
  try {
    const raw = localStorage.getItem(LIKE_COUNTS_KEY);
    if (raw) return JSON.parse(raw);
    return { '1': 24, '2': 18, '3': 31 };
  } catch {
    return { '1': 24, '2': 18, '3': 31 };
  }
};

const loadViews = (): Record<string, number> => {
  try {
    const raw = localStorage.getItem(VIEWS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const saveLikes = (likes: string[]) => {
  localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
};

const saveLikeCounts = (counts: Record<string, number>) => {
  localStorage.setItem(LIKE_COUNTS_KEY, JSON.stringify(counts));
};

const saveViews = (views: Record<string, number>) => {
  localStorage.setItem(VIEWS_KEY, JSON.stringify(views));
};

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    setLikedPosts(loadLikes());
    setLikeCounts(loadLikeCounts());
    setViewCounts(loadViews());
  }, []);

  const getPost = useCallback((id: string) => BLOG_POSTS.find((p) => p.id === id), []);

  const isLiked = useCallback(
    (postId: string) => likedPosts.includes(postId),
    [likedPosts]
  );

  const toggleLike = useCallback((postId: string) => {
    const wasLiked = likedPosts.includes(postId);
    setLikedPosts((prev) => {
      const next = wasLiked ? prev.filter((id) => id !== postId) : [...prev, postId];
      saveLikes(next);
      return next;
    });
    setLikeCounts((prev) => {
      const delta = wasLiked ? -1 : 1;
      const next = { ...prev, [postId]: Math.max(0, (prev[postId] ?? 0) + delta) };
      saveLikeCounts(next);
      return next;
    });
  }, [likedPosts]);

  const getLikeCount = useCallback(
    (postId: string) => likeCounts[postId] ?? 0,
    [likeCounts]
  );

  const getViewCount = useCallback(
    (postId: string) => viewCounts[postId] ?? 0,
    [viewCounts]
  );

  const incrementView = useCallback((postId: string) => {
    setViewCounts((prev) => {
      const next = { ...prev, [postId]: (prev[postId] ?? 0) + 1 };
      saveViews(next);
      return next;
    });
  }, []);

  const value: BlogContextType = {
    posts: BLOG_POSTS,
    getPost,
    isLiked,
    toggleLike,
    getLikeCount,
    getViewCount,
    incrementView,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export const useBlog = () => {
  const ctx = useContext(BlogContext);
  if (!ctx) throw new Error('useBlog must be used within BlogProvider');
  return ctx;
};
