const controller = {};

let img; // for storing current uploaded image

controller.getImg = (req, res, next) => {
  return res.render("index", {
    data: img,
  });
};

controller.postImg = (req, res, next) => {
  console.log(req.file.filename);
  img = req.file.filename;
  return res.redirect("/");
};

module.exports = controller;
