# 📦 CIPHER VAULT — Installation Guide

---

## ✅ Prerequisites

The **only** thing you need is a modern web browser (Chrome, Firefox, Edge, Brave).

> No Node.js. No MongoDB. No server. No installation required.  
> Cipher VAULT is a **100% client-side** application.

---

## 🚀 Method 1: Open Directly (Easiest)

1. Download or clone the repository
2. Open the `CipherVault/` folder
3. Double-click **`index.html`**
4. That's it — the app is running!

---

## 🖥️ Method 2: VS Code Live Server (Recommended for Development)

1. Install [VS Code](https://code.visualstudio.com/)
2. Install the **Live Server** extension
3. Open the `CipherVault/` folder in VS Code
4. Right-click `index.html` → **"Open with Live Server"**
5. App opens at `http://127.0.0.1:5500`

---

## 🌐 Method 3: Host on GitHub Pages (Free Hosting)

1. Push all files from `CipherVault/` to the **root** of your GitHub repository
2. Go to your repo → **Settings → Pages**
3. Set source to `main` branch → **Save**
4. Your site is live at: `https://yourusername.github.io/repo-name/`

---

## 📁 Files to Upload to GitHub

```
✅ Include:
  ├── index.html
  ├── encrypt.html
  ├── decrypt.html
  └── assets/
      ├── css/style.css
      ├── css/images/
      └── js/
          ├── script.js
          └── vaultDB.js

❌ Do NOT include:
  ├── node_modules/
  └── any backend/server files
```

---

## ✅ Testing the App

### Test 1: Encrypt Text
1. Go to **Encrypt** page
2. Enter any message (e.g., `Hello World`)
3. Enter passphrase: `abc12`
4. Click **Encrypt Now** → Copy the **Vault Code**

### Test 2: Decrypt Text
1. Go to **Decrypt** page
2. Enter the **Vault Code** and passphrase `abc12`
3. Click **Decrypt Now** → Original message appears

### Test 3: Encrypt a File
1. Go to **Encrypt** page
2. Choose any file (image, PDF, etc.)
3. Enter passphrase → Click **Encrypt Now**
4. On Decrypt page: enter the code and same passphrase → **Download** your original file

---

## 🔐 How Storage Works

| Data | Storage | Limit |
|------|---------|-------|
| Encrypted Text | Browser IndexedDB | ~500MB+ |
| Encrypted Files | Browser IndexedDB (WebCrypto AES-GCM) | ~500MB+ |

> Data is **never sent to any server**. Everything stays in your browser.

---

## 🚨 Common Issues

| Issue | Fix |
|-------|-----|
| Vault code not found on another computer | IndexedDB is local — both encrypt & decrypt must use the same browser |
| File fails to decrypt | Make sure the passphrase is exactly the same 5-character string |
| Page looks broken | Open via Live Server, not by double-clicking the file directly |

---

**Made by Rehan Naveed** | Educational & Academic Use