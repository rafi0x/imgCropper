const multer = require("multer");
const path = require("path");

// argument for dir name
const store = (dir) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, `../public/uploads/${dir}`));
    },
    filename: (req, file, cb) => {
      const extname = path.extname(file.originalname)
        ? path.extname(file.originalname)
        : `.${file.mimetype.split("/")[1]}`; // if get blob image data, add the extention from file type. (blob data comes wihtout extention)
      cb(null, `${file.fieldname}-${Date.now()}${extname}`);
    },
  });
};

// give the dir name where you image will upload
const upload = (dirName) => {
  return multer({
    storage: store(dirName),
    fileFilter: (req, file, cb) => {
      const type = /jpg|png|jpeg/i;
      const mimetype = type.test(file.mimetype);

      if (mimetype) {
        cb(null, true);
      } else {
        cb(new Error("only png, jpg, jpeg will work"));
      }
    },
  });
};

module.exports = upload;
