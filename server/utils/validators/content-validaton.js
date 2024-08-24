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
      .string({
        required_error: "Cannot find location to save content",
      })
      .optional(),
    blog: z
      .string({ required_error: "Blog must be defined" })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.content_type === "pdf" || data.content_type === "video") {
        return !!data.location;
      }
      return true;
    },
    { message: "Location is required for pdf and video content type", path: ["location"] }
  )
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
