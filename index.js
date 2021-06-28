require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("connected to db");
    }
  }
);
const app = express();
const port = 5000;
const indexRoute = require("./routes/index.route");
const productRoute = require("./routes/product.route");
const userRoute = require("./routes/user.route");
const reviewRoute = require("./routes/review.route");
const tokenRoute = require("./routes/token.route");

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(express.static("./build"));
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/review", reviewRoute);
app.use("/api", tokenRoute);
app.use("/", indexRoute);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
