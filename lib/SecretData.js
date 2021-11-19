import {MY_SECRET} from "./constants";
import CryptoJS from 'crypto-js'

export const SecretData = (dataObj) => {
  const secretPhone = CryptoJS.AES.encrypt(dataObj.phone, MY_SECRET).toString();
  const secretPassword = CryptoJS.AES.encrypt(dataObj.password, MY_SECRET).toString();

  return {phone: secretPhone, password: secretPassword};
}