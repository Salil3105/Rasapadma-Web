import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BLOG_POSTS } from '../../constants';
import type { BlogPost } from '../../constants';

const LIKES_KEY = 'drveda_blog_likes';
const LIKE_COUNTS_KEY = 'drveda_blog_like_counts';
const VIEWS_KEY = 'drveda_blog_views';

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

interface BlogState {
  likedPosts: string[];
  likeCounts: Record<string, number>;
  viewCounts: Record<string, number>;
}

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    likedPosts: loadLikes(),
    likeCounts: loadLikeCounts(),
    viewCounts: loadViews(),
  } as BlogState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      const wasLiked = state.likedPosts.includes(postId);
      if (wasLiked) {
        state.likedPosts = state.likedPosts.filter((id) => id !== postId);
        state.likeCounts[postId] = Math.max(0, (state.likeCounts[postId] ?? 0) - 1);
      } else {
        state.likedPosts.push(postId);
        state.likeCounts[postId] = (state.likeCounts[postId] ?? 0) + 1;
      }
      localStorage.setItem(LIKES_KEY, JSON.stringify(state.likedPosts));
      localStorage.setItem(LIKE_COUNTS_KEY, JSON.stringify(state.likeCounts));
    },
    incrementView: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      state.viewCounts[postId] = (state.viewCounts[postId] ?? 0) + 1;
      localStorage.setItem(VIEWS_KEY, JSON.stringify(state.viewCounts));
    },
  },
});

export const { toggleLike, incrementView } = blogSlice.actions;

export const getPost = (id: string): BlogPost | undefined =>
  BLOG_POSTS.find((p) => p.id === id);

export default blogSlice.reducer;
