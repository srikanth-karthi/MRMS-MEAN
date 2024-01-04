const User = require('../model/Userfile');
const createfileurl = require('../utils/namefiles')
const path = require("path");
const createError = require("http-errors");
const decoder = require("../utils/decodetoken");
const uploadfiles = async (req, res, next) => {
  try {
    const files = req.files;
    const pathArray = req.params.folderpath.split(',');
    const headfolder = req.params.headfolder;
    const userId = req.decoded.id;
    const user = await User.findOne({ userId });

    if (!user) next(createError.BadGateway('User not found'))
    

    if (headfolder !== pathArray[pathArray.length - 1]) {
      next(createError.BadRequest(`Folder '${headfolder}' not found`))
    }
    let currentFolder = user;

    for (const folderName of pathArray) {
      const foundFolder = currentFolder.folders.find(folder => folder.name === folderName);
      if (foundFolder) {
        currentFolder = foundFolder;
      } else {
        next(createError.BadRequest(`Folder '${folderName}' not found`))
      }
    }

    let output = [];
    for (let i = 0; i < files.length; i++) {

      const date = new Date();

      let data = {
        fileName: files[i].filename,
        Originalname: files[i].originalname,
        url: createfileurl(files[i].filename, userId),
        uploadDate: date.toLocaleString('en-US'),
        fileSize: user.filesize + files[i].size,
        role: 'user',
        uploadername: userId,
        fileType: files[i].mimetype
      }
      output.push(data);

      currentFolder.files.push( data )
    }



    user.markModified('folders');
    await user.save();


    res.status(200).json({ message: 'Files uploaded successfully!', data: output });
  } catch (err) {
    next(createError[500]({ error: 'Failed to upload files' ,err}))
  }
};



const fileupload = async (req, res) => {

  try {
    const files = req.files;

    const userId = req.decoded.id;
    let user = await User.findOne({ userId });

    if (!user) {
      user = new User({ userId });
    }

    let output = [];
    for (let i = 0; i < files.length; i++) {

      const date = new Date();

      let data = {
        fileName: files[i].filename,
        Originalname: files[i].originalname,
        url: createfileurl(files[i].filename, userId),
        uploadDate: date.toLocaleString('en-US'),
        fileSize: user.filesize + files[i].size,
        role: 'user',
        uploadername: userId,
        fileType: files[i].mimetype
      }
      console.log(data)
      output.push(data);

      user.outsideFiles.push( data )
    }
    await user.save();
    res.status(200).json({ message: 'Files uploaded successfully!', data: output });
  } catch (err) {
    next(createError[500]({ error: 'Failed to upload files' ,err}))
  }
};
const getfiles = async (req, res,next ) => {
  try {
    const token = req.params.token;
    if(!token) next(createError[400]('Invalid token format'))

    const decodedToken = decoder(token);

    if (Array.isArray(decodedToken) && decodedToken.length > 0 && decodedToken[0].filename) {
      const filename = decodedToken[0].filename;
      const filePath = path.join(__dirname, '..', 'uploads', filename);

      res.sendFile(filePath);
    } else {
      next(createError.BadGateway('Invalid token format or missing filename'))
    }
  } catch (err) {
    next(createError[500]('Failed to retrieve files'))
  }
};

module.exports = { uploadfiles, fileupload, getfiles };
