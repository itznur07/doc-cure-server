const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

/** Middlewares */
app.use(cors());
app.use(express.json());

/** Connect to MongoDB */
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@todos.ukwfq5e.mongodb.net/DocCure?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

/** Schema Valication */
// const serviceSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
// });


/** Mongoose Models */
const services = mongoose.model("services", new mongoose.Schema({}))

/** API Routes */
app.get("/services", async (req, res) => {
  const result = await services.find();
  res.send(result);
});

/** Basic Server Creations */
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
