const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifytoken'); 
const loginController = require('../controller/Auth');
const profileController = require('../controller/profile');
var profileUpload = require('../config/multerConfig');
const userfiles=require('../controller/userfiles');

router.post('/login', loginController.login);
router.post('/register', loginController.register);
router.get('/refreshtoken', loginController.refreshToken);

router.use(verifyToken)

router.post('/getprofile', profileController.profile); 
router.put('/profilephoto', profileUpload.single('file'), profileController.profilephoto);
router.get('/files',userfiles)

module.exports = router;
