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
router.post('/getprofile',verifyToken.verifyToken, profileController.profile); 
router.put('/profilephoto',verifyToken.verifyToken, profileUpload.single('file'), profileController.profilephoto);
router.post('/newfolder',verifyToken.verifyToken,addFolderToUser);
router.post('/uploadfiles/:folderpath/:headfolder',verifyToken.verifyToken,fileUploadMiddleware,uploadfiles)
router.post('/uploadfiles',verifyToken.verifyToken,fileUploadMiddleware,fileupload)
router.get('/files',verifyToken.verifyToken,userfiles)
router.post('/folder',verifyToken.verifyToken,addfolertofolder)
module.exports = router;
