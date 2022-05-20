const CryptoJS = require("crypto-js");
let decrypt = function(encrypt_text) {
    return CryptoJS.AES.decrypt(encrypt_text, process.env.NEXT_PUBLIC_MY_SECRET).toString(CryptoJS.enc.Utf8);
}
module.exports = decrypt
