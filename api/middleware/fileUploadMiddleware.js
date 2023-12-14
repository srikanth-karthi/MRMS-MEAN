const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const userId = req.decoded.id;
    const timestamp = Date.now(); 
    const filename = `${userId}-${timestamp}-${file.originalname}`;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });
module.exports = upload.array('files');
