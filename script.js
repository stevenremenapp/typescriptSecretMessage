"use strict";
let cipherText;
const encryptBtn = document.getElementById('encryptBtn');
const decryptBtn = document.getElementById('decryptBtn');
let choice = document.getElementById('encryptionSelect');
let message = document.getElementById('inputText').value;
const encryptedTextValue = document.getElementById('outputText');
const decryptedTextValue = document.getElementById('decryptText');
// RSA-OAEP Encryption & Decryption
let getMessageEncoding = () => {
    let message = document.getElementById('inputText').value;
    let enc = new TextEncoder();
    return enc.encode(message);
};
let encryptMessage = async (key) => {
    let encoded = getMessageEncoding();
    cipherText = await window.crypto.subtle.encrypt({
        name: "RSA-OAEP"
    }, key, encoded);
    let buffer = new Uint8Array(cipherText, 0, 5);
    // outputTextValue.textContent = `${buffer}...[${cipherText.byteLength} bytes total]`;
    encryptedTextValue.textContent = `Encrypted: ${buffer}`;
};
let decryptMessage = async (key) => {
    let encoded = getMessageEncoding();
    let decrypted = await window.crypto.subtle.decrypt({
        name: "RSA-OAEP"
    }, key, cipherText);
    let dec = new TextDecoder();
    decryptedTextValue.textContent = `Decrypted: ${dec.decode(decrypted)}`;
};
window.crypto.subtle.generateKey({
    name: "RSA-OAEP",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256"
}, true, ["encrypt", "decrypt"]).then((keyPair) => {
    encryptBtn.addEventListener("click", () => {
        if (choice.value === "rsa") {
            encryptMessage(keyPair.publicKey);
        }
    });
    decryptBtn.addEventListener("click", () => {
        if (choice.value === "rsa") {
            decryptMessage(keyPair.privateKey);
        }
    });
});
// Base64 & Unicode +1 Encryption and Decryption
encryptBtn.addEventListener("click", () => {
    // Base64
    if (choice.value === 'base64') {
        let message = document.getElementById('inputText').value;
        let encodedString = btoa(message);
        encryptedTextValue.textContent = `Encrypted: ${encodedString}`;
        // Unicode +1
    }
    else if (choice.value === 'unicode') {
        let unicodeMessage = document.getElementById('inputText').value;
        let chars = unicodeMessage.split('');
        let returnedUnicode = [];
        let encodedArray = [];
        for (let i = 0; i < chars.length; i++) {
            returnedUnicode.push(chars[i].charCodeAt(0) + 1);
        }
        for (let i = 0; i < returnedUnicode.length; i++) {
            encodedArray.push(String.fromCharCode(returnedUnicode[i]));
        }
        let encodedString = "".concat(...encodedArray);
        encryptedTextValue.textContent = `Encrypted: ${encodedString}`;
    }
});
decryptBtn.addEventListener("click", () => {
    // Base64
    if (choice.value === 'base64') {
        let message = document.getElementById('inputText').value;
        let decodedString = atob(message);
        decryptedTextValue.textContent = `Decrypted: ${decodedString}`;
        // Unicode +1
    }
    else if (choice.value === 'unicode') {
        let unicodeMessage = document.getElementById('inputText').value;
        let chars = unicodeMessage.split('');
        let returnedUnicode = [];
        let encodedArray = [];
        for (let i = 0; i < chars.length; i++) {
            returnedUnicode.push(chars[i].charCodeAt(0) - 1);
        }
        for (let i = 0; i < returnedUnicode.length; i++) {
            encodedArray.push(String.fromCharCode(returnedUnicode[i]));
        }
        let decodedString = "".concat(...encodedArray);
        decryptedTextValue.textContent = `Decrypted: ${decodedString}`;
    }
});
//# sourceMappingURL=script.js.map