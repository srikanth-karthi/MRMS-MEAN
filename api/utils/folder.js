// ../utils/folder.js

function checkFolderExists(folders, folderName) {
    return folders.find(folder => folder.name === folderName);
  }
  
  module.exports = checkFolderExists;
  