import { z } from "zod";

export const petFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 character" })
    .max(20, { message: "Name must be at most 20 characters" }),
  ownerName: z
    .string()
    .trim()
    .min(3, { message: "Owner name must be at least 3 characters" })
    .max(50, { message: "Owner name must be at most 50 characters" }),
  imageUrl: z.string().trim().url({ message: "Image URL must be a valid URL" }),
  // By default the Browser will return a string, so we need to convert it to a number
  age: z.coerce
    .number()
    .int()
    .positive()
    .max(20, { message: "Age must be at most 20" }),
  // Notes are optional
  notes: z.union([
    z.literal(""),
    z
      .string()
      .trim()
      .max(1000, { message: "Notes must be at most 1000 characters" }),
  ]),
});

export const petIdSchema = z.string().cuid();

export const authFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .max(100, { message: "Email must be at most 100 characters" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" }),
});
