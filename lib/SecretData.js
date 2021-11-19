import {MY_SECRET} from "./constants";
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

export const SecretData = (string) => {
  const hashDigest = sha256(string);
  console.log(string)
  const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, MY_SECRET));
  console.log(hmacDigest)
  return hmacDigest
}