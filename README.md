# Encryption
Assignment 2 for CIT368

# Secure Node.js Encryption Utility

This utility is a Node.js application that encrypts and decrypts messages using AES-256-CBC symmetric encryption. The application reads user input from the console, encrypts it, saves the encrypted data to disk, and then decrypts it to demonstrate the encryption and decryption process.

## Features

- Takes user input directly from the console.
- Validates input length to ensure it meets the criteria.
- Encrypts the input using AES-256-CBC encryption algorithm.
- Uses `crypto` module for cryptographic functionality.
- Generates a unique salt and IV for each encryption operation.
- Saves the encrypted data to the disk (`encryptedData.json`).
- Reads and decrypts data from the disk to demonstrate successful encryption and decryption.
- Utilizes `dotenv` for environment variable management to securely handle encryption keys.

## How to Use

1. Install Node.js and npm on your system.
2. Clone this repository.
3. Run `npm install` to install dependencies.
4. Create a `.env` file at the root of the project and set `PASS=your_encryption_password` where `your_encryption_password` is a secure password of your choosing.
5. Run the application using `node index.js`.
6. Enter the text you wish to encrypt when prompted.

## Security Notes

- The encryption key is derived from the password provided in the `.env` file using a secure key derivation function.
- The salt and IV are randomly generated for each session, ensuring encrypted data is unique even when the same input is encrypted multiple times.
- Do not commit the `.env` file or any sensitive information to your version control system.

## Dependencies

- `crypto`: Node.js built-in module for encryption.
- `dotenv`: Module for environment variable management.
- `readline`: Node.js built-in module for reading input from the console.

## Contributing

Feel free to fork this repository, make changes, and submit pull requests. If you find any issues or have suggestions for improvements, please submit an issue on GitHub.

## License

This project is open-source and available
