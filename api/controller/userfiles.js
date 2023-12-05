const User = require('../model/Userfile'); 

const userfiles = async (req, res) => {
  try {
    const  userId  = req.decoded.id;


    const user = await User.findOne({ userId }, 'folders outsideFiles');

    if (!user) {
      return res.status(200).json({ msg: 'Userdata not found' });
    }
console.log(user)
    const folderNames = user.folders.map(folder => folder.name);

    const fileNamesInFolders = user.folders.reduce((acc, folder) => {
      const files = folder.files.map(file => file.fileName);
  
      return { ...acc, [folder.name]: files };
    }, {});

    const outsideFileNames = user.outsideFiles.map(file => file.fileName);

    res.status(200).json({ folderNames, fileNamesInFolders, outsideFileNames,user });
  } catch (err) {
    console.error('Error fetching folder and file details:', err);
    res.status(500).json({ error: 'Failed to fetch folder and file details' });
  }
};

module.exports = userfiles;
