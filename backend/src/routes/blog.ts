import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/extension';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';

export const blogRouter = new Hono<{
  Bindings: { DATABASE_URL: string; JWT_SECRET: string };
  Variables: { userId: string; userEmail: string };
}>();

// Auth Middleware
blogRouter.use('/*', async (c, next) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const authHeader = c.req.header('Authorization');
    const token = authHeader?.split(' ')?.[1];

    if (!token) {
      return c.json({ message: 'Unauthorized access' }, 403);
    }

    const userData = await verify(token, c.env.JWT_SECRET);

    if (typeof userData.id !== 'string' || typeof userData.email !== 'string') {
      return c.json({ message: 'Unauthorized access' }, 403);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userData.id,
        email: userData.email,
      },
    });

    if (!user) {
      return c.json({ message: 'Invalid credentials' }, 404);
    }

    c.set('userId', user.id);
    c.set('userEmail', user.email);

    await next();
  } catch (error) {
    return c.json({ message: 'Unauthorized access' }, 403);
  }
});

// Route to change blog data
blogRouter.post('/', (c) => {
  return c.text('Hello Hono!');
});

// Route to create a new blog
blogRouter.put('/', (c) => {
  return c.text('Hello Hono!');
});

// Route to get a blog's data using its id
blogRouter.get('/:id', (c) => {
  return c.text('Hello Hono!');
});

// Route to get all blogs
blogRouter.get('/bulk', (c) => {
  return c.text('Hello Hono!');
});
