import z from "zod";

export const registerUserSchema = z.object({
  body: z.object({
    username: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address").trim().toLowerCase(),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export const verifyEmailSchema = z.object({
  query: z.object({
    token: z.string(),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z.email("Invalid email address").trim().toLowerCase(),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});
