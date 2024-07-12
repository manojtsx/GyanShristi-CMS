const express = require("express");
const app = express();
const cors = require("cors");
const corsOption = require('./configs/corsConfig');
require('./configs/env');
const dbConnection = require('./utils/database/connection');
const authRouter = require('./routes/auth-route')
const userRouter = require('./routes/user-route');

// Call all the environment variable
const PORT = process.env.PORT;

// // Apply cors options
// const corsOption = {
//     origin : process.env.FRONTEND_URL,
//     methods : "GET,POST,PUT,DELETE",
//     allowHeaders : 'Content-Type,Authorization',
//     optionsSuccessStatus : 200
// } 

app.use(cors(corsOption));
app.use(express.json());

// Handle all the routes here
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);

app.get("/", async(req, res) => {
  res.status(200).send("hello world")
});

dbConnection().then((data)=>{
  console.log(data);
  app.listen(PORT, () => {
    console.log(`Listening to the server at PORT ${PORT}`);
  });
}).catch((err)=>{
  console.error(err)
})

