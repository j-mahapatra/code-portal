import { z } from 'zod';

export const signupBody = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
});

export const signinBody = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const createBlogBody = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlogBody = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});
