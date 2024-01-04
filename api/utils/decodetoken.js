var CryptoJS = require("crypto-js");

function decodetoken(token) {
  try {
    var bytes = CryptoJS.AES.decrypt(token, 'secret key 123');
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error('Error decrypting token:', error);
    return null; // Return null or handle the error as needed in your application
  }
}

module.exports = decodetoken;
