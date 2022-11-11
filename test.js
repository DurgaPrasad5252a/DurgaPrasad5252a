const uuid = require("uuid");
var CryptoJS = require("crypto-js");
const id = uuid.v4();

var encData = CryptoJS.AES.encrypt("node@12345", id).toString();
console.log(encData);
var decData = CryptoJS.AES.decrypt(encData, id).toString(CryptoJS.enc.Utf8);
console.log(decData);
