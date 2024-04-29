require('dotenv').config();
const crypto = require('crypto');
const fs = require('fs');
const readline = require('readline');
const dotenv = require('dotenv');
const algorithm = 'aes-256-cbc'; // Using AES encryption
const password = process.env.pass; // This should be a secure password in practice
const salt = crypto.randomBytes(16); // Randomly generated for each file
const key = crypto.scryptSync(password, salt, 32); // Using scrypt for key derivation
const iv = crypto.randomBytes(16); // Initialization vector


// Function to encrypt text
function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { iv: iv.toString('hex'), content: encrypted, salt: salt.toString('hex') };
}

// Function to decrypt text
function decrypt(hash) {
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(hash.iv, 'hex'));
  let decrypted = decipher.update(hash.content, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Encrypt the input and save it to disk
function saveToDisk(input) {
    const encryptedData = encrypt(input);
    fs.writeFileSync('encryptedData.json', JSON.stringify(encryptedData));
    console.log('Data encrypted and saved to disk.');
    return encryptedData; // Return the encrypted data
  }

// Decrypt the data from disk and print it
function decryptFromDisk() {
  const data = fs.readFileSync('encryptedData.json');
  const encryptedData = JSON.parse(data);
  const decryptedData = decrypt(encryptedData);
  console.log('Decrypted data:', decryptedData);
}

// Input validation and program execution
function main(input) {
  if(input.length < 1 || input.length > 1000) { // Validate input length
    console.log('Input is not of valid length.');
    return;
  }
  const encryptedData = saveToDisk(input); 
  console.log('Encrypted data:', JSON.stringify(encryptedData));
  decryptFromDisk();
}

// Create an interface for input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt the user for input
rl.question('Enter your input: ', (input) => {
  main(input); // Execute the main function with the input
  rl.close(); // Close the readline interface
});
