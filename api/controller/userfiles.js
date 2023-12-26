const User = require('../model/Userfile'); 

const userfiles = async (req, res) => {
  try {
    const  userId  = req.decoded.id;
    const user = await User.findOne({ userId }, 'folders outsideFiles');
    if (!user) {
      return res.status(200).json({ msg: 'Userdata not found' });
    }
    // const extractFolderNames = (folders, folderNames = []) => {
    //   for (const folder of folders) {
    //     folderNames.push(folder.name);
    //     if (folder.folders.length > 0) {
    //       extractFolderNames(folder.folders, folderNames);
    //     }
    //   }
    //   return folderNames;
    // };
    
    // const extractFileNames = (folders, fileNames = []) => {
    //   for (const folder of folders) {
    //     for (const file of folder.files) {
    //       fileNames.push(file.fileName);
    //     }
    //     if (folder.folders.length > 0) {
    //       extractFileNames(folder.folders, fileNames);
    //     }
    //   }
    //   return fileNames;
    // };

    // const allFolderNames = extractFolderNames(user.folders);
    // const allFileNames = extractFileNames(user.folders);
    // for (const file of user.outsideFiles) {
    //   allFileNames.push(file.fileName);
    // }
    
    res.status(200).json({ user });
  } catch (err) {
    console.error('Error fetching folder and file details:', err);
    res.status(500).json({ error: 'Failed to fetch folder and file details' });
  }
};

module.exports = userfiles;
