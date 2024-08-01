const {z} = require('zod');

const categorySchema = z.object({
    title : z
    .string({required_error : "Title is required"})
    .min(3,{message : "Title must be at least 3 characters long."})
    .max(255,{message : "Title must be at most 255 characters long."})
})

module.exports = categorySchema;