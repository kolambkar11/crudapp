import { z, ZodType } from "zod"; // Add new import
export const UserSchema: ZodType<FormData> = z
  .object({
    name: z
      .string()
      .min(3, { message: "input must be greater than 3 " })
      .max(10, { message: "input must be less than 10 " }),
    email: z.string().email(),
    contact: z.number().max(10, { message: "must be a contact number " }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });
