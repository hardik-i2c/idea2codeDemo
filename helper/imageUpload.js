const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file) {
      req.file = "";
      cb(null, true);
    } else {
      const regx = /jpeg|png|gif|jpg/;
      if (!regx.test(path.extname(file.originalname))) {
        return cb(new Error("file not support", false));
      }
      const mimetype = file.mimetype.split("/")[1];
      if (!regx.test(mimetype)) {
        return cb(new Error("file not support", false));
      }
      cb(null, true);
    }
  },
});

module.exports = upload;
