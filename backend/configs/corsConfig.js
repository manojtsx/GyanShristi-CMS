const FRONTEND_URL= process.env.FRONTEND_URL;

const corsOption = {
    origin: FRONTEND_URL,
    optionsSuccessStatus: 200,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    allowHeaders: "Content-Type, Authorization",
    credentials: true,
  };

  module.exports = corsOption;