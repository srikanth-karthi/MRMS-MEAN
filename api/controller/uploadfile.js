const User = require('../model/Userfile');

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
      output.push({ fileName: file.filename,Originalname:file.originalname})
      currentFolder.files.push({ fileName: file.filename,Originalname:file.originalname});
    }


   
    user.markModified('folders');
    await user.save();
    

    res.status(200).json({ message: 'Files uploaded successfully!',data:output });
  } catch (err) {
    console.error('Error uploading files:', err);
    res.status(500).json({ error: 'Failed to upload files' });
  }
};



const fileupload = async (req, res) => {
 
  try {
    const files = req.files;

    const userId = req.decoded.id;


    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  



let output=[];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      output.push({ fileName: file.filename,Originalname:file.originalname})
      user.outsideFiles.push({ fileName: file.filename,Originalname:file.originalname});
    }


   

    await user.save();
    

    res.status(200).json({ message: 'Files uploaded successfully!',data:output });
  } catch (err) {
    console.error('Error uploading files:', err);
    res.status(500).json({ error: 'Failed to upload files' });
  }
};
module.exports = {uploadfiles,fileupload};
