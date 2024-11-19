const { z } = require("zod");

// Creating a registration schema
const editUserSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(255, { message: "Name must be at most 255 characters long" }),
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(255, { message: "Username must be at most 255 characters long" }),
  phone_number: z
    .string({ required_error: "Phone Number is required" })
    .trim()
    .min(7, { message: "Phone Number must be at least 7 characters long" })
    .max(15, { message: "Phone Number must be at most 15 characters long" }),
  address: z
    .string({ required_error: "Address is required" })
    .trim()
    .min(3, { message: "Address must be at least 3 characters long" })
    .max(255, { message: "Address must be at most 255 characters long" }),
});

module.exports = editUserSchema;
