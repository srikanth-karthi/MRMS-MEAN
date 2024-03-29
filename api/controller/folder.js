const User = require("../model/Userfile");
const createfileurl =require('../utils/namefiles')
const checkFolderExists = require('../utils/folder')
const createError = require("http-errors");
const addFolderToUser = async (req, res,next) => {
  try {
    
    if (!req.decoded || !req.decoded.id) {
      return next(createError.Unauthorized("Unauthorized: Missing or invalid token")) 
    }
    const folderName = req.body.foldername;
    
    if (!folderName || folderName.trim() === "") {
      return next(createError.BadRequest("Folder name is required" )) 
    }

    const userId = req.decoded.id;
    
    
    let user = await User.findOne({ userId });
    if (!user) {
      user = new User({ userId });
    }


    if (checkFolderExists(user.folders, folderName)) {
      console.log("Folder with the same name already exists");
      return res.status(200).json({
        status: "samename",
        message: "Folder with the same name already exists",
      });
    }

    const newFolder = { name: folderName,folders:[], files: [],role:'user', uploadername:userId
   };
    user.folders.push(newFolder);

    await user.save();
    console.log("Folder added to user:", folderName);
    res.status(200).json({
      status: "sucess",
      message: "Folder added successfully",
     data:newFolder
    });
  } catch (error) {
    console.error("Error adding folder to user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const addfolertofolder = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const pathArray = req.body.folderpath;
    const headfolder = req.body.headfolder;
    const newFolderName = req.body.foldername;

    const user = await User.findOne({ userId });

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    if (!newFolderName || newFolderName.trim() === "") {
      return res.status(400).json({ message: "Folder name is required" });
    }
    if (headfolder !== pathArray[pathArray.length - 1]) {
      console.log(`Folder '${headfolder}' not found`);
      return res
        .status(404)
        .json({ message: `Folder '${headfolder}' not found` });
    }

    let currentFolder = user.folders;

    for (const folderName of pathArray) {
      const foundFolder = currentFolder.find(
        (folder) => folder.name === folderName
      );
      if (foundFolder) {
        currentFolder = foundFolder.folders;
      } else {
        console.log(`Folder '${folderName}' not found`);
        return res
          .status(404)
          .json({ message: `Folder '${folderName}' not found` });
      }
    }


    if (checkFolderExists(currentFolder, newFolderName)) {
      console.log("Folder with the same name already exists");
      return res.status(200).json({
        status: "samename",
        message: "Folder with the same name already exists",
      });
    }

    const newFolder = {
      name: newFolderName,
      folders: [],
      files: [],
      role:'user',
      uploadername:userId,
      
    };

    currentFolder.push(newFolder);

    user.markModified("folders");

    await user.save();

    console.log(
      `New folder '${newFolderName}' added to path [${pathArray.join(", ")}]`
    );
    res
      .status(200)
      .json({ status: "success", message: "Folder added successfully",data:newFolder});
  } catch (error) {
    console.error("Error adding folder:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const uploadfolder = async (req, res) => {
  try {
    const foldername = req.params.foldername;
    const files = req.files;
    const userId = req.decoded.id;
    const newFolder = {
      name: foldername,
      folders: [],
      files: [],
      role:'user',
      uploadername:userId
    };
    let user = await User.findOne({ userId });
    if (!user) {
      user = new User({ userId });
    }

    if (checkFolderExists(user.folders, foldername)) {
      console.log("Folder with the same name already exists");
      return res.status(200).json({
        status: "samename",
        message: "Folder with the same name already exists",
      });
    }
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const date = new Date(); // Current date and time

      const uploadDate = date.toLocaleString('en-US'); // Current date and time of upload
      const fileSize = file.size; // File size in bytes
      const fileType = file.mimetype;
      user.filesize=user.filesize+fileSize;
      const timestamp = Date.now(); // MIME type of the file
      newFolder.files.push({
        fileName: file.filename,
        Originalname: file.originalname,
        url:createfileurl(file.filename,userId),

        uploadDate: uploadDate,
        fileSize: fileSize,
        role:'user',
        uploadername:userId,
        fileType: fileType
      });
    }
    user.folders.push(newFolder);
    user.markModified("folders");
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Folder added successfully",
      data: newFolder,
    });
  } catch (error) {
    console.error("Error adding folder:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const uploadfoldertofolder= async (req, res) => {
  const files = req.files;
  const foldername = req.params.foldername;
  const pathArray = req.params.folderpath.split(',');
  const headfolder = req.params.headfolder;
console.log(pathArray,headfolder)
  const userId = req.decoded.id;
  const user = await User.findOne({ userId });
  if (!user) {
    user = new User({ userId });
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
  
  if (checkFolderExists( currentFolder.folders, foldername)) {
    console.log("Folder with the same name already exists");
    return res.status(200).json({
      status: "samename",
      message: "Folder with the same name already exists",
    });
  }
  const newFolder = {
    name: foldername,
    folders: [],
    files: [],
    role:'user' ,
    uploadername:userId
  };
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const date = new Date(); // Current date and time

    const uploadDate = date.toLocaleString('en-US'); 
      const fileSize = file.size; 
      const fileType = file.mimetype;
      user.filesize=user.filesize+fileSize; 
      const timestamp = Date.now(); // MIME type of the file
      // MIME type of the file
      newFolder.files.push({
        fileName: file.filename,
        Originalname: file.originalname,
        url:createfileurl(file.filename,userId),

        uploadDate: uploadDate,
        fileSize: fileSize,
        role:'user',
        uploadername:userId,
        fileType: fileType
      });
  }
  console.log(newFolder)
  currentFolder.folders.push(newFolder);
  user.markModified("folders");
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Folder added successfully",
    data: newFolder,
  });



}
module.exports = { addFolderToUser, addfolertofolder, uploadfolder ,uploadfoldertofolder};
