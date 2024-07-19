import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import { createBlogBody, updateBlogBody } from '../config/zod';

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

// Route to create a new blog
blogRouter.put('/', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = createBlogBody.safeParse(body);

    if (!success) {
      return c.json({ message: 'Incomplete details' }, 400);
    }

    await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get('userId'),
        published: true,
      },
    });

    return c.json({ message: 'Post created' });
  } catch (error) {
    return c.json({ message: 'Internal Server Error' }, 500);
  }
});

// Route to change blog data
blogRouter.post('/', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = updateBlogBody.safeParse(body);

    if (!success || (!body.title && !body.content)) {
      return c.json({ message: 'Incomplete details' }, 400);
    }

    await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.content && { content: body.content }),
      },
    });

    return c.json({ message: 'Post updated' });
  } catch (error) {
    return c.json({ message: 'Internal Server Error' }, 500);
  }
});

// Route to get all blogs
blogRouter.get('/all', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return c.json({ posts: posts });
  } catch (error) {
    return c.json({ message: 'Internal Server Error' }, 500);
  }
});

// Route to get a blog's data using its id
blogRouter.get('/:id', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param('id');

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return c.json({ post });
  } catch (error) {
    return c.json({ message: 'Internal Server Error' }, 500);
  }
});
