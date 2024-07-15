import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { decode, sign } from 'hono/jwt';
import { signinBody, signupBody } from '../config/zod';

export const userRouter = new Hono<{
  Bindings: { DATABASE_URL: string; JWT_SECRET: string };
  Variables: { userId: string; userEmail: string };
}>();

// Route to create a new user
userRouter.put('/signup', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = signupBody.safeParse(body);

    if (!success) {
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

    const { success } = signinBody.safeParse(body);

    if (!success) {
      return c.json({ message: 'Invalid credentials' }, 400);
    }

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

// Route for fetching user details
userRouter.get('/details', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const authHeader = c.req.header('Authorization');
    const token = authHeader?.split(' ')?.[1];

    if (!token) {
      return c.json({ message: 'Unauthorized access' }, 403);
    }

    const user = decode(token);
    const id = user?.payload?.id ?? '';

    const userData = await prisma.user.findUnique({
      where: {
        id: id as string,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return c.json(userData, 200);
  } catch (error) {
    return c.json({ message: 'Internal Server Error' }, 500);
  }
});
