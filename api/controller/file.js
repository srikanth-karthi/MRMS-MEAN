const User = require('../model/Userfile');
const createfileurl =require('../utils/namefiles')
const path = require("path");
const decoder = require("../utils/decodetoken");
const uploadfiles = async (req, res) => {
 
  try {
    const files = req.files;
    const pathArray = req.params.folderpath.split(',');
    const headfolder = req.params.headfolder;
console.log(pathArray,headfolder)
    const userId = req.decoded.id;


    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    if(headfolder!==pathArray[pathArray.length-1])
{
  console.log(`head Folder '${headfolder}' not found`);
        return res.status(404).json({ message: `Folder '${headfolder}' not found` });
}
    let currentFolder = user;

    for (const folderName of pathArray) {
      const foundFolder = currentFolder.folders.find(folder => folder.name === folderName);
      if (foundFolder) {
        currentFolder = foundFolder;
      } else {
        console.log(`Folder '${folderName}' not found`);
        return res.status(404).json({ message: `Folder '${folderName}' not found` });
      }
    }

let output=[];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const date = new Date(); // Current date and time
    
      const uploadDate = date.toLocaleString('en-US');


      const fileSize = file.size; // File size in bytes
      const fileType = file.mimetype; // MIME type of the file
      user.filesize=user.filesize+fileSize;


      output.push({
        fileName: file.filename,
        Originalname: file.originalname,
        url:createfileurl(file.filename,userId),
        uploadDate: uploadDate,
        fileSize: fileSize,
        role:'user',
        uploadername:userId,
        fileType: fileType
      });

      currentFolder.files.push({
        fileName: file.filename,
        Originalname: file.originalname,
        url:createfileurl(file.filename,userId),
        uploadDate: uploadDate,
        fileSize: fileSize,
        role:'user',
        uploadername:userId,
        fileType: fileType
      })
    }


   
    user.markModified('folders');
    await user.save();
    

    res.status(200).json({ message: 'Files uploaded successfully!',data:output });
  } catch (err) {
    // console.error('Error uploading files:', err);
    res.status(500).json({ error: 'Failed to upload files' });
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
let output=[];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const date = new Date();
      const uploadDate = date.toLocaleString('en-US');
      const fileSize = file.size; 
      const fileType = file.mimetype; 
    

      user.filesize=user.filesize+fileSize;
      output.push({
        fileName: file.filename,
        Originalname: file.originalname, 
        url:createfileurl(file.filename,userId),
        uploadDate: uploadDate,
        fileSize: fileSize,
        role:'user',
        uploadername:userId,
        fileType: fileType
      });

      user.outsideFiles.push({
        fileName: file.filename,
        Originalname: file.originalname,
        url:createfileurl(file.filename,userId),

        uploadDate: uploadDate,
        fileSize: fileSize,
        role:'user',
        uploadername:userId,
        fileType: fileType
      })

    }
    await user.save();
    res.status(200).json({ message: 'Files uploaded successfully!',data:output });
  } catch (err) {
    console.error('Error uploading files:', err);
    res.status(500).json({ error: 'Failed to upload files' });
  }
};
const getfiles = async (req, res) => {
  try {
    const token = req.params.token;
    console.log(token);

    const decodedToken = decoder(token);
    
    if (Array.isArray(decodedToken) && decodedToken.length > 0 && decodedToken[0].filename) {
      const filename = decodedToken[0].filename;
      const filePath = path.join(__dirname, '..', 'uploads', filename);
      
      res.sendFile(filePath);
    } else {
      throw new Error('Invalid token format or missing filename');
    }
  } catch (err) {
    console.error('Error retrieving files:', err);
    res.status(500).json({ error: 'Failed to retrieve files' });
  }
};

module.exports = {uploadfiles,fileupload,getfiles};
