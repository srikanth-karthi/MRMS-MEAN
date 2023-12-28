

var CryptoJS = require("crypto-js");

function decodetoken(token)
{
var bytes  = CryptoJS.AES.decrypt(token, 'secret key 123');
return  JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

}
module.exports = decodetoken;