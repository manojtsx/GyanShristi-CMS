const express = require("express");
const app = express();
const cors = require("cors");
const corsOption = require('./configs/corsConfig');
require('./configs/env');
const dbConnection = require('./utils/database/connection')

// Call all the environment variable
const PORT = process.env.PORT;

app.use(cors(corsOption));
app.use(express.json());

// listen to the server
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

dbConnection().then((data)=>{
  console.log(data);
  app.listen(PORT, () => {
    console.log(`Listening to the server at PORT ${PORT}`);
  });
}).catch((err)=>{
  console.error(err)
})

