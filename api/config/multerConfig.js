var multer = require('multer');

var profileStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'profile/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var profileUpload = multer({ storage: profileStorage });

module.exports = profileUpload;
