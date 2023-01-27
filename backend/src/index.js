const cors = require('cors')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set("strictQuery", true);
require ("dotenv").config()
const route = require("./route")

//MongoDB configuration
mongoose.connect(process.env.DB, { useNewUrlParser: true })
.then(() => console.log("MongoDb is connected"))
.catch((err) => console.log(err));

// Middleware
app.use(express.json()); // for parsing application/json
app.use(cors())
app.use("/", route)

// Routes
app.get('/', (req, res) => {
  res.send('Backend is Working!');
});

// Start server 
app.listen(8800, () => console.log(`Server is running`));
