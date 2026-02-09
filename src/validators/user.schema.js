import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),

  email: z.string().email("Invalid email format").max(100),

  // optional because DB has default = 0
  age: z
    .number()
    .int("Age must be an integer")
    .min(0, "Age cannot be negative")
    .optional(),
});

export const userIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "User id must be a number"),
});
