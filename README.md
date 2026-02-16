# 🔐 CIPHER VAULT

> Secure client-side encryption platform with one-time vault codes

A full-stack web application that enables secure encryption and decryption of text and files using industry-standard AES-256 cryptography, one-time access codes, and zero-knowledge architecture.

![CIPHER VAULT](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![Node](https://img.shields.io/badge/Node.js-v18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

---

## 🌟 Features

### Core Functionality
- ✅ **AES-256 Encryption** - Industry-standard symmetric encryption
- ✅ **One-Time Vault Codes** - Automatically destroyed after first use
- ✅ **Text Encryption** - Unlimited length, supports all characters
- ✅ **File Encryption** - All file types (PDF, images, archives, documents)
- ✅ **Zero-Knowledge Architecture** - Plaintext never reaches server
- ✅ **Cross-Device Support** - Backend API for seamless sharing
- ✅ **Auto-Expiry** - Vault codes expire after 24 hours

### Security Features
- 🔒 Client-side AES encryption
- 🔒 5-character mandatory passphrase
- 🔒 Random 6-character vault codes
- 🔒 Database-enforced one-time usage
- 🔒 MongoDB Atlas encrypted storage
- 🔒 No plaintext server storage
- 🔒 Automatic code expiration (TTL indexes)

### User Experience
- 🎨 Modern dark theme with neon accents
- 🎨 Responsive design (mobile-friendly)
- 🎨 Intuitive user interface
- 🎨 Real-time validation
- 🎨 Copy-to-clipboard functionality
- 🎨 Clear error messages

---

## 🏗️ Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    User Browser                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Frontend (HTML/CSS/JavaScript + CryptoJS)       │  │
│  │  - Client-side AES encryption                     │  │
│  │  - User interface                                 │  │
│  │  - Form validation                                │  │
│  └──────────────────┬───────────────────────────────┘  │
└─────────────────────┼──────────────────────────────────┘
                      │ HTTPS
                      ▼
┌─────────────────────────────────────────────────────────┐
│              Backend API (Node.js + Express)             │
│  ┌──────────────────────────────────────────────────┐  │
│  │  RESTful API Endpoints                            │  │
│  │  - POST /api/vault/encrypt                        │  │
│  │  - POST /api/vault/decrypt                        │  │
│  │  - Vault code generation                          │  │
│  │  - One-time enforcement                           │  │
│  └──────────────────┬───────────────────────────────┘  │
└─────────────────────┼──────────────────────────────────┘
                      │ Secure Connection
                      ▼
┌─────────────────────────────────────────────────────────┐
│            Database (MongoDB Atlas)                      │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Encrypted Data Storage                           │  │
│  │  - Vault codes (indexed)                          │  │
│  │  - Encrypted ciphertext only                      │  │
│  │  - File metadata                                  │  │
│  │  - TTL indexes (24h auto-delete)                 │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| HTML5 | Structure & semantic markup |
| CSS3 | Styling & responsive design |
| JavaScript (ES6+) | Client-side logic |
| CryptoJS | AES-256 encryption library |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Server runtime |
| Express.js | Web framework & routing |
| Mongoose | MongoDB ODM |
| dotenv | Environment variables |
| cors | Cross-origin resource sharing |
| body-parser | Request parsing |

### Database
| Technology | Purpose |
|------------|---------|
| MongoDB Atlas | Cloud database hosting |
| TTL Indexes | Automatic document expiration |
| Encryption at Rest | Built-in security |

---

## 📖 How It Works

### Encryption Flow
```
1. User enters text/file + passphrase (5 chars)
2. CryptoJS encrypts data in browser (AES-256)
3. Encrypted ciphertext sent to backend API
4. Backend generates random 6-char vault code
5. Stores: {code, encryptedData, metadata} in MongoDB
6. Returns vault code to user
7. User shares code + passphrase separately
```

### Decryption Flow
```
1. Receiver enters vault code + passphrase
2. Backend validates code exists & isUsed=false
3. Returns encrypted data to frontend
4. CryptoJS decrypts using passphrase
5. Backend marks code as used (isUsed=true)
6. Original plaintext displayed
7. Code permanently invalidated
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ ([Download](https://nodejs.org/))
- MongoDB Atlas account ([Sign up](https://www.mongodb.com/cloud/atlas/register))
- Git ([Download](https://git-scm.com/))

### Installation

See [INSTALLATION.md](INSTALLATION.md) for detailed setup instructions.

**Quick Setup:**
```bash
# Clone repository
git clone https://github.com/Rehan Naveed/darkcipher-vault.git
cd cipher-vault

# Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm start

# Frontend (open in browser)
cd ../frontend
# Open index.html in browser
```

---

## 📸 Screenshots

### Home Page
![Home](screenshots/home.png)

### Encryption Interface
![Encrypt](screenshots/encrypt.png)

### Decryption Interface
![Decrypt](screenshots/decrypt.png)

---

## 📋 Usage

See [USER_GUIDE.md](USER_GUIDE.md) for detailed instructions.

**Quick Example:**

**Encrypt:**
```
1. Open encrypt.html
2. Enter: "Secret Message 123"
3. Passphrase: abc12
4. Click "Encrypt Now"
5. Copy vault code: X9K2AB
```

**Decrypt:**
```
1. Open decrypt.html
2. Enter vault code: X9K2AB
3. Enter passphrase: abc12
4. Click "Decrypt Now"
5. View original message
```

---

## 🔒 Security

### Design Principles
- **Zero-Knowledge Architecture** - Server never sees plaintext
- **Client-Side Encryption** - AES encryption in browser
- **Separation of Concerns** - Vault code ≠ encryption key
- **One-Time Access** - Database-enforced single use
- **Auto-Expiry** - TTL indexes (24h automatic deletion)

### Encryption Details
- **Algorithm:** AES-256 (Advanced Encryption Standard)
- **Mode:** CBC (Cipher Block Chaining)
- **Key Derivation:** PBKDF2 (via CryptoJS)
- **Library:** CryptoJS 4.2.0
- **Passphrase:** 5 characters (alphanumeric)

### MongoDB Security
- **Encryption at Rest** - Atlas built-in
- **Encryption in Transit** - TLS/SSL
- **IP Whitelist** - Network access control
- **User Authentication** - Database credentials
- **No Plaintext Storage** - Only encrypted data

---

## 🧪 Testing

See [TESTING.md](TESTING.md) for complete test cases.

**Quick Test:**
```bash
# Backend health check
curl http://localhost:5000/api/health

# Expected response:
{
  "success": true,
  "message": "CIPHER VAULT Backend Running",
  "timestamp": "2026-01-27T10:00:00.000Z"
}
```

---

## 📚 Documentation

- [INSTALLATION.md](INSTALLATION.md) - Setup & configuration guide
- [USER_GUIDE.md](USER_GUIDE.md) - How to use the platform
- [TECHNICAL.md](TECHNICAL.md) - Architecture & API documentation
- [TESTING.md](TESTING.md) - Test cases & quality assurance

---

## 🗂️ Project Structure
```
CIPHER-VAULT/
│
├── frontend/                 # Client-side application
│   ├── index.html           # Landing page
│   ├── encrypt.html         # Encryption interface
│   ├── decrypt.html         # Decryption interface
│   └── assets/
│       ├── css/
│       │   └── style.css    # Styling
│       ├── js/
│       │   └── script.js    # Frontend logic
│       └── images/
│           └── Vault.png    # Background image
│
├── backend/                  # Server-side application
│   ├── server.js            # Main server file
│   ├── package.json         # Dependencies
│   ├── routes/
│   │   └── vault.js         # API routes
│   ├── models/
│   │   └── Vault.js         # MongoDB schema
│   └── config/
│       └── db.js            # Database connection
│
└── docs/                     # Documentation
    ├── README.md
    ├── INSTALLATION.md
    ├── USER_GUIDE.md
    ├── TECHNICAL.md
    └── TESTING.md
```

---

## 🔮 Future Enhancements

### Planned Features
- [ ] QR Code generation for vault codes
- [ ] Email notifications
- [ ] Multi-recipient sharing
- [ ] Custom expiry times
- [ ] File size validation
- [ ] Rate limiting
- [ ] User accounts (optional)
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Browser extension

### Security Improvements
- [ ] Stronger passphrase requirements (8-16 chars)
- [ ] Two-factor authentication
- [ ] CAPTCHA integration
- [ ] Audit logs
- [ ] Penetration testing

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Rehan Naveed**
- University Project: Cybersecurity & Web Development
- GitHub: [@Rehan Naveed](https://github.com/Rehan Naveed)
- Email: toku7balls@gmail.com

---

## 🙏 Acknowledgments

- [CryptoJS](https://cryptojs.gitbook.io/) - Encryption library
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database
- [Express.js](https://expressjs.com/) - Web framework
- [Node.js](https://nodejs.org/) - Runtime environment

---

## 📞 Support

For issues or questions:
- Open an [Issue](https://github.com/your-Rehan Naveed/cipher-vault/issues)
- Email: toku7balls@gmail.com

---

## ⭐ Show Your Support

Give a ⭐ if this project helped you!

---

**Built with ❤️ for secure communication**
