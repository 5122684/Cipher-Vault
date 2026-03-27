# 🔐 Cipher VAULT

A secure, **100% client-side** one-time encryption platform built with pure HTML, CSS, and JavaScript. No server. No backend. No data ever leaves your browser.

---

## ✨ Features

- 🔒 **AES Text Encryption** — Encrypt any message using CryptoJS AES with a 5-character passphrase
- 📁 **File Encryption (WebCrypto)** — Encrypt files of any size using the browser's native **WebCrypto API** (AES-GCM-256 with PBKDF2 key derivation)
- 🗝️ **One-Time Vault Codes** — Each encrypted entry generates a unique 6-character code that is deleted after use
- 💾 **IndexedDB Storage** — Encrypted data is stored locally in the browser's IndexedDB (no 5MB localStorage limits!)
- 🔓 **Full Decryption** — Paste your vault code and passphrase to instantly retrieve and download your data
- 🔥 **Auto-Destroy** — Vault entries are permanently deleted from the database after successful decryption

---

## 🗂️ Project Structure

```
CipherVault/
├── index.html          # Landing / Home Page
├── encrypt.html        # Encryption Page
├── decrypt.html        # Decryption Page
└── assets/
    ├── css/
    │   ├── style.css   # Main stylesheet
    │   └── images/     # Background image
    └── js/
        ├── vaultDB.js  # IndexedDB helper functions
        └── script.js   # Core AES encryption/decryption logic
```

---

## 🚀 How to Use

### Running Locally
Simply open `index.html` in any modern browser. No server or installation required.

If you want to use a local dev server (e.g. VS Code Live Server):
```
Open CipherVault/index.html with Live Server
```

### Encrypting a Message
1. Go to the **Encrypt** page.
2. Type your message **or** upload a file.
3. Enter a **5-character passphrase** (e.g. `abc12`).
4. Click **Encrypt Now** — you'll receive a **6-character Vault Code**.
5. Share the Vault Code and passphrase with the recipient **separately**.

### Decrypting Data
1. Go to the **Decrypt** page.
2. Enter the **Vault Code** and the **passphrase**.
3. Click **Decrypt Now** — your original text or file will appear.
4. For files, click **Download Original File**.

> ⚠️ Each Vault Code can only be used **once**. After decryption, the data is permanently deleted.

---

## 🔐 Cryptography Details

| Data Type | Algorithm | Key Derivation |
|-----------|-----------|----------------|
| Text      | AES (CryptoJS) | Passphrase directly |
| Files     | AES-GCM 256-bit (WebCrypto) | PBKDF2 (100,000 iterations, SHA-256) |

- Encrypted data is **never sent to any server**
- All operations happen entirely inside your browser
- A random 16-byte **salt** and 12-byte **IV** are generated for each file encryption

---

## 🌐 Hosting on GitHub Pages

1. Upload all files from the `CipherVault/` folder to the **root** of your GitHub repository.
2. Go to **Settings → Pages** and enable GitHub Pages from the `main` branch.
3. Your site will be live at: `https://yourusername.github.io/repository-name/`

---

## 👨‍💻 Author

**Rehan Naveed**  
Built for academic and educational purposes.  
Demonstrates modern cryptographic principles, IndexedDB storage, and client-side data security.

---

## 📄 License

MIT License — Free to use, modify, and distribute.
