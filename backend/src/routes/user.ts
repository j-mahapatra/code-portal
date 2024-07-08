import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign } from 'hono/jwt';

export const userRouter = new Hono<{
  Bindings: { DATABASE_URL: string; JWT_SECRET: string };
  Variables: { userId: string; userEmail: string };
}>();

// Route to create a new user
userRouter.post('/signup', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    if (!body.email || !body.password) {
      return c.json({ message: 'Invalid credentials' }, 400);
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const token = await sign(
      { id: user.id, email: user.email },
      c.env.JWT_SECRET
    );

    return c.json({ token, message: 'User created' }, 201);
  } catch (error) {
    console.log(error);
    return c.json({ message: 'User signup failed' }, 500);
  }
});

// Route for user signin
userRouter.post('/signin', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      return c.json({ message: 'Invalid credentials' }, 404);
    }

    const token = await sign(
      { id: user.id, email: user.email },
      c.env.JWT_SECRET
    );

    return c.json({ token });
  } catch (error) {
    return c.json({ message: 'User signin failed' }, 500);
  }
});
