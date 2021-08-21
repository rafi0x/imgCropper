// dependencies
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

// router controller
const { getImg, postImg } = require("./controller");
// internal middlewares
const upload = require("./middlewares/uploader");

// main app
const app = express();

// set view engine
app.set("view engine", "ejs");

// app middlewares
const middleware = [
  express.static("public"),
  express.urlencoded({ extended: true }),
];
app.use(middleware);

// router
app.route("/").get(getImg).post(upload("imgs").single("image"), postImg);

// server connection
app.listen(process.env.APP_PORT || 3000, () => {
  console.log(`webServer started on ${process.env.APP_PORT || 3000}`);
});
