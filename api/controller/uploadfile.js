const User = require('../model/Userfile');
const sanitize = require('sanitize-filename');
const createFileHash =require('../utils/namefiles')

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

      console.log(uploadDate) // Current date and time of upload
      const fileSize = file.size; // File size in bytes
      const fileType = file.mimetype; // MIME type of the file
      user.filesize=user.filesize+fileSize;
      const timestamp = Date.now();
      output.push({
        fileName: file.filename,
        Originalname: file.originalname,
        token:createFileHash(`${userId}-${timestamp}-${sanitize(file.originalname)}`),
        uploadDate: uploadDate,
        fileSize: fileSize,
        role:'user',
        uploadername:userId,
        fileType: fileType
      });

      currentFolder.files.push({
        fileName: file.filename,
        Originalname: file.originalname,
     
        token:createFileHash(`${userId}-${timestamp}-${sanitize(file.originalname)}`),
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
      const date = new Date(); // Current date and time

      const uploadDate = date.toLocaleString('en-US'); // Current date and time of upload
      const fileSize = file.size; // File size in bytes
      const fileType = file.mimetype; 
    
Token=createFileHash(file.filename,userId),
      user.filesize=user.filesize+fileSize;
      output.push({
        fileName: file.filename,
        Originalname: file.originalname,
      token:Token,

        uploadDate: uploadDate,
        fileSize: fileSize,
        role:'user',
        uploadername:userId,
        fileType: fileType
      });

      user.outsideFiles.push({
        fileName: file.filename,
        Originalname: file.originalname,
        token:Token,

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

    res.setHeader('Content-Disposition', 'attachment; filename="renamed-file.pdf"');
  
    res.status(200).json({ message: 'Files uploaded successfully!',data:output });
  } catch (err) {
    console.error('Error uploading files:', err);
    res.status(500).json({ error: 'Failed to upload files' });
  }
};
module.exports = {uploadfiles,fileupload,getfiles};
