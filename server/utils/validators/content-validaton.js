const { z } = require("zod");

const contentSchema = z
  .object({
    title: z
      .string({ required_error: "Title is required" })
      .trim()
      .min(3, { message: "Title must be at least 3 characters long" })
      .max(255, { message: "Title must be at most 255 characters long" }),
    description: z
      .string({ required_error: "Description is required" })
      .trim()
      .min(3, { message: "Description must be at least 3 characters long" })
      .max(255, { message: "Description must be at most 255 characters long" }),
    location: z
      .string({ required_error: "Cannot find location to save content" })
      .optional(),
    blog: z
      .string({ required_error: "Blog must be defined" })
      .optional(),
    user_id: z
      .string({ required_error: "User ID is required" })
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid User ID format"),  // Assuming MongoDB ObjectId format
    category_id: z
      .string({ required_error: "Category ID is required" })
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid Category ID format"), // Assuming MongoDB ObjectId format
    content_type: z
      .enum(["post", "pdf", "video"], { required_error: "Content type is required" }),
  })
  .refine(
    (data) => {
      if (data.content_type === "post") {
        return !!data.blog;
      }
      return true;
    },
    { message: "Blog is required for post content type", path: ["blog"] }
  );

module.exports = contentSchema;
