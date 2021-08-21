const fs = require("fs");
const path = require("path");
const controller = {};

let img; // for storing current uploaded image

controller.getImg = (req, res, next) => {
  return res.render("index", {
    data: img,
  });
};

controller.postImg = (req, res, next) => {
  console.log(req.file.filename);
  // for removing old cropper image from file system.
  if (img) {
    fs.unlink(
      path.join(
        __dirname,
        `../public/uploads/${req.file.destination.split("/").pop()}/${img}`
      ),
      (err) => console.log(err)
    ); // req.file.destination.split("/").pop() for get the dir of uploaded image, which was defined with uploader middleware.
  }
  // store new image name for display in frontEnd
  img = req.file.filename;
  return res.redirect("/");
};

module.exports = controller;
