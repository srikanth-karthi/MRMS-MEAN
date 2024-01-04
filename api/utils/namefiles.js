var CryptoJS = require("crypto-js");
require("dotenv").config();
function createfileurl(filename,userid) {
var data = [{'filename': filename}, {'userid': userid}]
token = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
const encodedToken = encodeURIComponent(token);
const url = `${process.env.bacendurl}/api/files/getfiles/${encodedToken}`;
return url

}
module.exports = createfileurl;
  
  