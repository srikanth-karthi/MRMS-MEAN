const createError = require("http-errors");
const path = require("path");
const User = require('../model/Userfile');
const createfileurl = require('../utils/namefiles');
const decoder = require("../utils/decodetoken");


const uploadfiles = async (req, res, next) => {
  try {
    const { files } = req;
    const { folderpath, headfolder } = req.params;
    const userId = req.decoded.id;

    let user = await User.findOne({ userId });

    if (!user) {
      next( createError.BadGateway('User not found'))
    }

    const pathArray = folderpath.split(',');
    const lastFolder = pathArray[pathArray.length - 1];

    if (headfolder !== lastFolder) {
      throw createError.BadRequest(`Folder '${headfolder}' not found`);
    }

    let currentFolder = user;
    for (const folderName of pathArray) {
      const foundFolder = currentFolder.folders.find(folder => folder.name === folderName);
      if (!foundFolder) {
        next(createError.BadRequest(`Folder '${folderName}' not found`))
      }
      currentFolder = foundFolder;
    }

    const output = [];
    const date = new Date();
    for (const file of files) {
      const data = {
        fileName: file.filename,
        Originalname: file.originalname,
        url: createfileurl(file.filename, userId),
        uploadDate: date.toLocaleString('en-US'),
        fileSize: user.filesize + file.size,
        role: 'user',
        uploadername: userId,
        fileType: file.mimetype
      };
      output.push(data);
      currentFolder.files.push(data);
    }

    user.markModified('folders');
    await user.save();

    res.status(200).json({ message: 'Files uploaded successfully!', data: output });
  } catch (err) {
    next(createError(500, 'Failed to upload files', { error: err }));
  }
};

const fileupload = async (req, res, next) => {
  try {
    const { files } = req;
    const userId = req.decoded.id;

    let user = await User.findOne({ userId });

    if (!user) {
      user = new User({ userId });
    }

    const output = [];
    const date = new Date();
    for (const file of files) {
      const data = {
        fileName: file.filename,
        Originalname: file.originalname,
        url: createfileurl(file.filename, userId),
        uploadDate: date.toLocaleString('en-US'),
        fileSize: user.filesize + file.size,
        role: 'user',
        uploadername: userId,
        fileType: file.mimetype
      };
      output.push(data);
      user.outsideFiles.push(data);
    }

    await user.save();
    res.status(200).json({ message: 'Files uploaded successfully!', data: output });
  } catch (err) {
    next(createError(500, 'Failed to upload files', { error: err }));
  }
};

const getfiles = async (req, res, next) => {
  try {
    const { token } = req.params;

    if (!token) {
      throw createError(400, 'Invalid token format');
    }

    const decodedToken = decoder(token);

    if (Array.isArray(decodedToken) && decodedToken.length > 0 && decodedToken[0].filename) {
      const filename = decodedToken[0].filename;
      const filePath = path.join(__dirname, '..', 'uploads', filename);

      res.sendFile(filePath);
    } else {
      throw createError.BadGateway('Invalid token format or missing filename');
    }
  } catch (err) {
    next(createError(500, 'Failed to retrieve files', { error: err }));
  }
};

module.exports = { uploadfiles, fileupload, getfiles };
