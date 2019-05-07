# TypeScript Secret Messages!

My first project to practice TypeScript. In making this I also learned a bit about web encryption and decryption, including the SubtleCrypto Web API. I learned about how to work with Base64 encoding and decoding and how to manipulate strings as Unicode characters. The code is a little sloppy, but it did give me a feel for using TypeScript.

I don't know if I will return to this project and I didn't but in enough time to address many of the side issues I discovered, but things to be improved include:

- Style and cleaning up the presentation in general
- Addressing ["the Unicode Problem"](https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem) in my Base64 encoding and decoding
- Refactoring the script so it's cleaner
- Making the limitations of the SubtleCrypto option clearer (only 256 bytes/190 characters allowed; it's one encryption in to one decryption out -- an encrypted message is only good for that session and fails if another message has since been encrypted)
- Error handling
- Creating a click to copy icon that allows the user to copy the created messages with one click

Try it out here: 