
const express = require('express');
const router = express.Router();
const {uploadfiles,fileupload,getfiles}=require('../controller/file');
const fileUploadMiddleware = require('../middleware/fileUploadMiddleware');
const verifyToken = require('../middleware/verifytoken'); 

router.get('/getfiles/:token',getfiles)


router.use(verifyToken)

router.post('/uploadfiles/:folderpath/:headfolder',fileUploadMiddleware,uploadfiles)
router.post('/uploadfiles',fileUploadMiddleware,fileupload)



module.exports = router;