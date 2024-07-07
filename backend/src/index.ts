import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt"; 

const app = new Hono<{ Bindings: { DATABASE_URL: string, JWT_SECRET: string } }>();

// Route to create a new user
app.post("/api/v1/user/signup", async (c) => {
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
        name: body.name
      }
    })
  
    const token = await sign({ id: user.id, email: user.email }, c.env.JWT_SECRET);

    return c.json({ token, message: 'User created' }, 201);
  } catch (error) {
    return c.json({ message: 'User signup failed' }, 500);
  }
});

// Route for user signin
app.post("/api/v1/user/signin", (c) => {
  return c.text("Hello Hono!");
});

// Route to change blog data
app.post("/api/v1/blog", (c) => {
  return c.text("Hello Hono!");
});

// Route to create a new blog
app.put("/api/v1/blog", (c) => {
  return c.text("Hello Hono!");
});

// Route to get a blog's data using its id
app.get("/api/v1/blog/:id", (c) => {
  return c.text("Hello Hono!");
});

// Route to get all blogs
app.get("/api/v1/blog/bulk", (c) => {
  return c.text("Hello Hono!");
});

export default app;
