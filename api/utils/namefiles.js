var CryptoJS = require("crypto-js");
function createFileHash(filename,userid) {

var data = [{'filename': filename}, {'userid': userid}]
return  CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();

}
module.exports = createFileHash;
  
  