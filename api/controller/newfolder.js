const User = require('../model/Userfile')

const addFolderToUser = async (req, res) => {
  try {
    const folderName = req.body.foldername;

    if (!req.decoded || !req.decoded.id) {
      return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
    }

    const userId = req.decoded.id;

    let user = await User.findOne({ userId });

    if (!user) {
      user = new User({ userId });
    }

    const existingFolder = user.folders.find(folder => folder.name === folderName);
    if (existingFolder) {
      console.log('Folder with the same name already exists');
      return res.status(200).json({ status: 'samename', message: 'Folder with the same name already exists' });
    }

    if (!folderName || folderName.trim() === '') {
      return res.status(400).json({ message: 'Folder name is required' });
    }

    const newFolder = { name: folderName, files: [] };
    user.folders.push(newFolder);

    await user.save();
    console.log('Folder added to user:', folderName);
    res.status(200).json({ status: 'sucess', message: 'Folder added successfully', foldername: folderName });
  } catch (error) {
    console.error('Error adding folder to user:', error);
    res.status(500).json({ message: 'Server error' });
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
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    if (!newFolderName || newFolderName.trim() === '') {
      return res.status(400).json({ message: 'Folder name is required' });
    }
    if (headfolder !== pathArray[pathArray.length - 1]) {
      console.log(`Folder '${headfolder}' not found`);
      return res.status(404).json({ message: `Folder '${headfolder}' not found` });
    }

    let currentFolder = user.folders;

    for (const folderName of pathArray) {
      const foundFolder = currentFolder.find(folder => folder.name === folderName);
      if (foundFolder) {
        currentFolder = foundFolder.folders;
      } else {
        console.log(`Folder '${folderName}' not found`);
        return res.status(404).json({ message: `Folder '${folderName}' not found` });
      }
    }

    const existingFolder = currentFolder.find(folder => folder.name === newFolderName);
    if (existingFolder) {
      console.log('Folder with the same name already exists');
      return res.status(200).json({ status: 'samename', message: 'Folder with the same name already exists' });
    }

  

    const newFolder = {
      name: newFolderName,
      folders: [],
      files: [],
    };

    currentFolder.push(newFolder);


    user.markModified('folders');

    await user.save();

    console.log(`New folder '${newFolderName}' added to path [${pathArray.join(', ')}]`);
    res.status(200).json({ status: 'success', message: 'Folder added successfully' });
  } catch (error) {
    console.error('Error adding folder:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
module.exports = { addFolderToUser, addfolertofolder };
