const dotenv = require('dotenv');
dotenv.config();
const FRONTEND_URL= process.env.FRONTEND_URL;
const HOSTED_URL= process.env.FRONTEND_HOSTED_URL;

const corsOption = {
    origin: [FRONTEND_URL, HOSTED_URL],
    optionsSuccessStatus: 200,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    allowHeaders: "Content-Type, Authorization",
    credentials: true,
  };

  module.exports = corsOption; 