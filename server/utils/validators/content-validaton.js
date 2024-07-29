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
    content_type: z
      .enum(["pdf", "video", "post"], {
        required_error: "Content Type is required",
      })
      .refine((val) => val.trim().length >= 3, {
        message: "Content Type must be at least 3 characters long",
      }),
    location: z.string({
      required_error: "Cannot find location to save content",
    }),
    status: z.enum(["Pending", "Uploaded", "Rejected"], {
      required_error: "Set the status",
    }),
    blog: z
      .enum(["Pending", "Uploaded", "Rejected"], {
        required_error: "Set the status",
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.content_type === "pdf" || data.content_type === "video") {
        if (!data.location) {
          return false;
        }
      }
      return true;
    },
    { message: "Location is required for pdf and video content type" }
  )
  .refine(
    (data) => {
      if (data.content_type === "post") {
        if (!data.blog) {
          return false;
        }
      }
      return true;
    },
    { message: "Blog is required for post content type" }
  );

module.exports = contentSchema;
