const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifytoken'); 
const {addFolderToUser,addfolertofolder,uploadfolder,uploadfoldertofolder}=require('../controller/folder');
const fileUploadMiddleware = require('../middleware/fileUploadMiddleware');




router.use(verifyToken)



router.post('/newfolder',addFolderToUser);
router.post('/folder',addfolertofolder)
router.post('/uploadfolder/:foldername',fileUploadMiddleware,uploadfolder)
router.post('/uploadtofolder/:foldername/:folderpath/:headfolder',fileUploadMiddleware,uploadfoldertofolder)

module.exports = router;
