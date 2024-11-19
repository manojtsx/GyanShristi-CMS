const {z} = require('zod');

const categorySchema = z.object({
    title : z
    .string({required_error : "Title is required"})
    .trim()
    .min(3,{message : "Title must be at least 3 characters long."})
    .max(255,{message : "Title must be at most 255 characters long."}),
    user_id: z
    .string({ required_error: "User ID is required" })
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid User ID format" }),
})

module.exports = categorySchema;