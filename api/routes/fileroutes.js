
const express = require('express');
const router = express.Router();
const {uploadfiles,fileupload}=require('../controller/uploadfile');
const fileUploadMiddleware = require('../middleware/fileUploadMiddleware');
const verifyToken = require('../middleware/verifytoken'); 


router.use(verifyToken)

// router.get('/', )
router.post('/uploadfiles/:folderpath/:headfolder',fileUploadMiddleware,uploadfiles)
router.post('/uploadfiles',fileUploadMiddleware,fileupload)

module.exports = router;