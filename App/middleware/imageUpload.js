const multer = require("multer");
const path = require("path");

//storage and file naming setting
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/rooms/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });

  const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed (.jpg, .jpeg, .png)'), false);
    }
  };

  const upload = multer({storage:storage,fileFilter});
  module.exports = upload;