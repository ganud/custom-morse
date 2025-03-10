import CryptoJS from "crypto-js";

// Returns an encrypted base 64 using AES.
export function encrypt(message, key) {
  return CryptoJS.AES.encrypt(message, key).toString();
}

// Decrypt base64 into a string.
// Return an empty string if the key is invalid.
export function decrypt(base64, key) {
  let output;
  try {
    output = CryptoJS.AES.decrypt(base64, key).toString(CryptoJS.enc.Utf8);
  } catch (e) {
    output = "";
  }
  return output;
}

// var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase").toString();
// console.log(encrypted);
// var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase").toString(
//   CryptoJS.enc.Utf8
// );
console.log(encrypt("Walter", "asa"));
console.log(decrypt("U2FsdGVkX1+iqxWvZ6nlIwYaweMnKMfCuXHKCP56sYY=", "asa"));

// var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passp");
