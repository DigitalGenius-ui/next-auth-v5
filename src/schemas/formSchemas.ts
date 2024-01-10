import * as z from "zod";

export const loginSchemas = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(1, {
    message: "Password is required!",
  }),
});

export const registerSchemas = z.object({
  name: z.string().min(5, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(1, {
    message: "Password is required!",
  }),
});
