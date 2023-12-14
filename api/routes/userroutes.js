const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifytoken'); 
const loginController = require('../controller/login');
const profileController = require('../controller/profile');
var profileUpload = require('../config/multerConfig');
const {addFolderToUser,addfolertofolder}=require('../controller/newfolder');
const fileUploadMiddleware = require('../middleware/fileUploadMiddleware');
const {uploadfiles,fileupload}=require('../controller/uploadfile');
const userfiles=require('../controller/userfiles');

router.post('/login', loginController.login);
router.post('/register', loginController.register);
router.use(verifyToken.verifyToken)
router.post('/getprofile', profileController.profile); 
router.put('/profilephoto', profileUpload.single('file'), profileController.profilephoto);
router.get('/files',userfiles)

router.post('/newfolder',addFolderToUser);
router.post('/folder',addfolertofolder)

router.post('/uploadfiles/:folderpath/:headfolder',fileUploadMiddleware,uploadfiles)
router.post('/uploadfiles',fileUploadMiddleware,fileupload)
module.exports = router;
