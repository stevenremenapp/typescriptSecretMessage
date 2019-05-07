let cipherText:ArrayBuffer;
const encryptBtn = (<HTMLElement>document.getElementById('encryptBtn'));
const decryptBtn = (<HTMLElement>document.getElementById('decryptBtn'));
let choice = (<HTMLOptionElement>document.getElementById('encryptionSelect'));
let message:string = (<HTMLInputElement>document.getElementById('inputText')).value;
const encryptedTextValue:HTMLElement = (<HTMLElement>document.getElementById('outputText'));
const decryptedTextValue:HTMLElement = (<HTMLElement>document.getElementById('decryptText'));

// RSA-OAEP Encryption & Decryption

let getMessageEncoding = ():Uint8Array => {
    let message:string = (<HTMLInputElement>document.getElementById('inputText')).value;
    let enc = new TextEncoder();
    return enc.encode(message);
}

let encryptMessage = async (key: CryptoKey) => {
    let encoded:Uint8Array = getMessageEncoding();
    cipherText = await window.crypto.subtle.encrypt(
        {
            name: "RSA-OAEP"
        },
        key,
        encoded
    );

    let buffer = new Uint8Array(cipherText, 0, 5);
    // outputTextValue.textContent = `${buffer}...[${cipherText.byteLength} bytes total]`;
    encryptedTextValue.textContent = `Encrypted: ${buffer}`;
}

let decryptMessage = async (key: CryptoKey) => {
    let encoded:Uint8Array = getMessageEncoding();
    let decrypted = await window.crypto.subtle.decrypt(
        {
            name: "RSA-OAEP"
        },
        key,
        cipherText
    );

    let dec = new TextDecoder();
    decryptedTextValue.textContent = `Decrypted: ${dec.decode(decrypted)}`;
}

window.crypto.subtle.generateKey(
    {
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256"
    },
    true,
    ["encrypt", "decrypt"]
).then((keyPair) => {
    encryptBtn.addEventListener("click", ():any => {
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

encryptBtn.addEventListener("click", ():void => {
    // Base64
    if (choice.value === 'base64') {
        let message:string = (<HTMLInputElement>document.getElementById('inputText')).value;
        let encodedString:string = btoa(message);
        encryptedTextValue.textContent = `Encrypted: ${encodedString}`;
    // Unicode +1
    } else if (choice.value === 'unicode') {
        let unicodeMessage:string = (<HTMLInputElement>document.getElementById('inputText')).value;
        let chars:string[] = unicodeMessage.split('');
        let returnedUnicode:number[] = [];
        let encodedArray:string[] = [];
        for (let i = 0; i < chars.length; i++) {
            returnedUnicode.push(chars[i].charCodeAt(0) + 1);
        }
        for (let i = 0; i < returnedUnicode.length; i++) {
            encodedArray.push(String.fromCharCode(returnedUnicode[i]));
        }
        let encodedString:string = "".concat(...encodedArray);
        encryptedTextValue.textContent = `Encrypted: ${encodedString}`;
    }
});

decryptBtn.addEventListener("click", ():void => {
    // Base64
    if (choice.value === 'base64') {
        let message:string = (<HTMLInputElement>document.getElementById('inputText')).value;
        let decodedString:string = atob(message);
        decryptedTextValue.textContent = `Decrypted: ${decodedString}`;
    // Unicode +1
    } else if (choice.value === 'unicode') {
        let unicodeMessage:string = (<HTMLInputElement>document.getElementById('inputText')).value;
        let chars:string[] = unicodeMessage.split('');
        let returnedUnicode:number[] = [];
        let encodedArray:string[] = [];
        for (let i = 0; i < chars.length; i++) {
            returnedUnicode.push(chars[i].charCodeAt(0) - 1);
        }
        for (let i = 0; i < returnedUnicode.length; i++) {
            encodedArray.push(String.fromCharCode(returnedUnicode[i]));
        }
        let decodedString:string = "".concat(...encodedArray);
        decryptedTextValue.textContent = `Decrypted: ${decodedString}`;
    }
});