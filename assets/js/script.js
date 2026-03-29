/* =============================================
   DARKCIPHER VAULT - FIXED VERSION
   Author: Rehan Naveed
============================================= */

/* ========= PASSPHRASE VALIDATION ========= */
function isValidPassphrase(key) {
    if (key.length !== 5) {
        return false;
    }
    return /^[a-zA-Z0-9]{5}$/.test(key);
}

/* ========= RANDOM VAULT CODE GENERATOR ========= */
function generateVaultCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

/* ========= MAIN ENCRYPT FUNCTION ========= */
function encryptData() {
    const textInput = document.getElementById("plainText");
    const fileInput = document.getElementById("fileInput");
    const passphraseInput = document.getElementById("passphrase");
    
    const text = textInput ? textInput.value.trim() : "";
    const key = passphraseInput ? passphraseInput.value : "";
    
    console.log("=== ENCRYPT DEBUG ===");
    console.log("Text:", text);
    console.log("Text length:", text.length);
    console.log("File input exists:", fileInput ? "YES" : "NO");
    console.log("Files selected:", fileInput && fileInput.files ? fileInput.files.length : 0);
    console.log("Passphrase:", key);
    
    // Validate passphrase first
    if (!isValidPassphrase(key)) {
        alert("⚠️ Passphrase must be exactly 5 characters (letters/digits only).");
        return;
    }
    
    // Check if file is selected
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
        console.log("→ File detected, encrypting file...");
        encryptFile();
        return;
    }
    
    // Check if text is provided
    if (!text || text === "") {
        alert("⚠️ Please enter text or select a file to encrypt.");
        return;
    }
    
    console.log("→ Text detected, encrypting text...");
    encryptText(text, key);
}

/* ========= ENCRYPT TEXT ========= */
async function encryptText(text, key) {
    const codeBox = document.getElementById("vaultCode");
    const resultBox = document.getElementById("encryptedResult");

    try {
        console.log("Encrypting text...");
        
        const encrypted = CryptoJS.AES.encrypt(text, key).toString();
        const vaultCode = generateVaultCode();

        const vaultData = {
            type: 'text',
            data: encrypted
        };

        await saveToVault(vaultCode, vaultData);

        codeBox.innerText = vaultCode;
        codeBox.style.color = "#00ff00";
        codeBox.style.fontWeight = "bold";

        resultBox.innerText = encrypted;
        resultBox.style.color = "#00d1ff";

        console.log("✅ Text encrypted successfully");
        console.log("Vault Code:", vaultCode);

        alert("✅ Encryption Successful!\n\n🔑 Vault Code: " + vaultCode + "\n\n📋 Copy this code and share with receiver.");

    } catch (error) {
        console.error("❌ Encryption error:", error);
        alert("❌ Encryption failed: " + error.message);
    }
}

/* ========= ENCRYPT FILE ========= */
async function encryptFile() {
    const fileInput = document.getElementById("fileInput");
    const key = document.getElementById("passphrase").value;
    const codeBox = document.getElementById("vaultCode");
    const resultBox = document.getElementById("encryptedResult");

    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        alert("⚠️ No file selected.");
        return;
    }

    const file = fileInput.files[0];
    console.log("File selected:", file.name, file.size, "bytes");

    try {
        console.log("File loaded, encrypting via WebCrypto...");
        
        const arrayBuffer = await file.arrayBuffer();
        
        // Native Web Crypto for large files to bypass memory limits
        const salt = window.crypto.getRandomValues(new Uint8Array(16));
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        
        const keyMaterial = await window.crypto.subtle.importKey(
            "raw",
            new TextEncoder().encode(key),
            { name: "PBKDF2" },
            false,
            ["deriveBits", "deriveKey"]
        );
        
        const cryptoKey = await window.crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt: salt,
                iterations: 100000,
                hash: "SHA-256"
            },
            keyMaterial,
            { name: "AES-GCM", length: 256 },
            false,
            ["encrypt"]
        );
        
        const encryptedBuffer = await window.crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv
            },
            cryptoKey,
            arrayBuffer
        );
        
        const vaultCode = generateVaultCode();

        const vaultData = {
            type: 'file-webcrypto',
            data: encryptedBuffer,
            salt: salt,
            iv: iv,
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size
        };

        await saveToVault(vaultCode, vaultData);

        codeBox.innerText = vaultCode;
        codeBox.style.color = "#00ff00";
        codeBox.style.fontWeight = "bold";

        resultBox.innerHTML = `
            <strong style="color: #00ff00;">✅ File Encrypted Successfully!</strong><br><br>
            📄 File: ${file.name}<br>
            📦 Size: ${(file.size / 1024).toFixed(2)} KB<br>
        `;

        console.log("✅ File encrypted successfully");
        console.log("Vault Code:", vaultCode);

        alert("✅ File Encryption Successful!\n\n🔑 Vault Code: " + vaultCode + "\n📄 File: " + file.name);

    } catch (error) {
        console.error("❌ File encryption error:", error);
        alert("❌ File encryption failed: " + error.message);
    }
}

/* ========= DECRYPT DATA ========= */
async function decryptData() {
    const code = document.getElementById("inputCode").value.trim().toUpperCase();
    const key = document.getElementById("decryptPassphrase").value;
    const resultBox = document.getElementById("decryptedResult");

    console.log("=== DECRYPT DEBUG ===");
    console.log("Code:", code);
    console.log("Passphrase:", key);

    if (!code) {
        alert("⚠️ Please enter the vault code.");
        return;
    }

    if (code.length !== 6) {
        alert("⚠️ Vault code must be exactly 6 characters.");
        return;
    }

    const vaultData = await getFromVault(code);
    console.log("Found data:", vaultData ? "YES" : "NO");

    if (!vaultData) {
        alert("❌ Invalid or expired vault code.\n\nPossible reasons:\n• Code already used\n• Wrong code entered\n• Encryption not done on this browser");
        return;
    }

    if (!isValidPassphrase(key)) {
        alert("⚠️ Passphrase must be exactly 5 characters (letters/digits only).");
        return;
    }

    try {
        if (vaultData.type === 'file' || vaultData.type === 'file-webcrypto') {
            await decryptFile(vaultData, key, resultBox, code);
        } else {
            await decryptText(vaultData.data, key, resultBox, code);
        }

    } catch (error) {
        console.error("❌ Decryption error:", error);
        alert("❌ Decryption failed: " + error.message);
    }
}

/* ========= DECRYPT TEXT ========= */
async function decryptText(encryptedData, key, resultBox, code) {
    console.log("Decrypting text...");

    const decrypted = CryptoJS.AES.decrypt(encryptedData, key);
    const originalText = decrypted.toString(CryptoJS.enc.Utf8);

    if (!originalText) {
        alert("❌ Wrong passphrase. Decryption failed.\n\nMake sure you're using the EXACT same passphrase.");
        return;
    }

    resultBox.innerText = originalText;
    resultBox.style.color = "#00ff00";
    resultBox.style.fontWeight = "bold";

    console.log("✅ Text decrypted successfully");

    alert("✅ Decryption Successful!\n\n🔓 Your original message has been recovered.");

    await deleteFromVault(code);
    console.log("🗑️ Vault code deleted:", code);
}

/* ========= DECRYPT FILE ========= */
async function decryptFile(vaultData, key, resultBox, code) {
    console.log("Decrypting file...");

    try {
        let blob;

        if (vaultData.type === 'file-webcrypto') {
            const keyMaterial = await window.crypto.subtle.importKey(
                "raw",
                new TextEncoder().encode(key),
                { name: "PBKDF2" },
                false,
                ["deriveBits", "deriveKey"]
            );
            
            const cryptoKey = await window.crypto.subtle.deriveKey(
                {
                    name: "PBKDF2",
                    salt: vaultData.salt,
                    iterations: 100000,
                    hash: "SHA-256"
                },
                keyMaterial,
                { name: "AES-GCM", length: 256 },
                false,
                ["decrypt"]
            );
            
            const decryptedBuffer = await window.crypto.subtle.decrypt(
                {
                    name: "AES-GCM",
                    iv: vaultData.iv
                },
                cryptoKey,
                vaultData.data
            );
            
            blob = new Blob([decryptedBuffer], { type: vaultData.fileType });
        } else {
            // Legacy CryptoJS support
            const decrypted = CryptoJS.AES.decrypt(vaultData.data, key);
            const base64Data = decrypted.toString(CryptoJS.enc.Utf8);

            if (!base64Data) {
                alert("❌ Wrong passphrase.");
                return;
            }

            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            
            const byteArray = new Uint8Array(byteNumbers);
            blob = new Blob([byteArray], { type: vaultData.fileType });
        }

        const url = URL.createObjectURL(blob);

        resultBox.innerHTML = `
            <strong style="color: #00ff00;">✅ File Decrypted Successfully!</strong><br><br>
            📄 File: ${vaultData.fileName}<br>
            📦 Size: ${(vaultData.fileSize / 1024).toFixed(2)} KB<br><br>
            <button onclick="downloadDecryptedFile('${url}', '${vaultData.fileName}')" class="btn-secondary" type="button">
                📥 Download Original File
            </button>
        `;

        console.log("✅ File decrypted successfully");

        alert("✅ File Decryption Successful!\n\n📄 File: " + vaultData.fileName);

        await deleteFromVault(code);

    } catch (error) {
        console.error("❌ File reconstruction error:", error);
        alert("❌ Failed to reconstruct file (wrong passphrase or corrupted)");
    }
}

/* ========= DOWNLOAD DECRYPTED FILE ========= */
function downloadDecryptedFile(url, fileName) {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/* ========= COPY VAULT CODE ========= */
function copyVaultCode() {
    const code = document.getElementById("vaultCode").innerText;
    
    if (code === "—" || code === "") {
        alert("⚠️ No vault code to copy. Encrypt data first.");
        return;
    }

    navigator.clipboard.writeText(code).then(() => {
        alert("✅ Vault code copied to clipboard!\n\n📋 Code: " + code);
    }).catch(() => {
        const textArea = document.createElement("textarea");
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert("✅ Vault code copied!\n\n📋 Code: " + code);
    });
}

