const multer = require('multer');
const sanitize = require('sanitize-filename');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const userId = req.decoded.id;
    const timestamp = Date.now(); 
    const filename = sanitize(`${userId}-${timestamp}-${sanitize(file.originalname)}`);
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });
module.exports = upload.array('files');
