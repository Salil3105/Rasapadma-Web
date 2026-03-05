import { BLOG_POSTS } from '../constants';
import type { BlogPost } from '../constants';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleLike, incrementView, getPost as getPostUtil } from '../store/slices/blogSlice';

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const useBlog = () => {
  const { likedPosts, likeCounts, viewCounts } = useAppSelector((s) => s.blog);
  const dispatch = useAppDispatch();

  return {
    posts: BLOG_POSTS,
    getPost: getPostUtil,
    isLiked: (postId: string) => likedPosts.includes(postId),
    toggleLike: (postId: string) => dispatch(toggleLike(postId)),
    getLikeCount: (postId: string) => likeCounts[postId] ?? 0,
    getViewCount: (postId: string) => viewCounts[postId] ?? 0,
    incrementView: (postId: string) => dispatch(incrementView(postId)),
  };
};
