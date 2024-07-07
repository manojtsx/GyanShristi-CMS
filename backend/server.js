const express = require("express");
const app = express();
const cors = require("cors");
const corsOption = require('./configs/corsConfig');
require('./configs/env');
const dbConnection = require('./utils/database/connection');
const authRouter = require('./routes/auth-route')

// Call all the environment variable
const PORT = process.env.PORT;

app.use(cors(corsOption));
app.use(express.json());

// Handle all the routes here
app.use('/api/auth',authRouter);

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

