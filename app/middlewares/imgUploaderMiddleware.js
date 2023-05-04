const multer = require("multer");
const path = require("path");
const storage = multer.memoryStorage();
const ApplicationError = require("../errors/ApplicationError");

const imgFilter = (req, file, callback) => {
  let extFile = path.extname(file.originalname);
  if (extFile === ".png" || extFile === ".jpg" || extFile === ".jpeg")
    return callback(null, true);
  callback(null, false);
  callback(new ApplicationError(400, "Filetype must be PNG/JPG/JPEG"));
};

const upload = multer({
  storage: storage,
  fileFilter: imgFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
}).single("image");

const imgUploader = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.status(400).json({
        status: "FAIL",
        message: err.message,
      });
      return;
    } else if (err) {
      // An unknown error occurred when uploading.
      res.status(400).json({
        status: "FAIL",
        message: err.message,
      });
      return;
    }
    next();
  });
};

module.exports = imgUploader;
