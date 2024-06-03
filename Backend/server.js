const express = require("express");
const mongoose = require("mongoose");

const server = express(); 
const port = 3000;

server.use(express.json());

//mongo connect code
mongoose.connect("mongodb://localhost:27017/mongoose", {
    
}).then(() => {
  console.log("MongoDB is connected");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});


server.use('/api/auth', require('./routes/auth'))
server.use('/api/notes', require('./routes/notes'))


//listing port server
server.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
