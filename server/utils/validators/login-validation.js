const {z} = require('zod');

const loginSchema = z.object({
    username : z
    .string({required_error : "Username is required"})
    .trim()
    .min(3,{message : "Username must be at least 3 characters long."})
    .max(255,{message : "Username must be at most 255 characters long."}),
    password : z
    .string({required_error : "Password is required"})
    .trim()
    .min(3,{message : "Password must be at least 3 characters long."})
    .max(255,{message : "Password must be at most 255 characters long."}),
})

module.exports = loginSchema;