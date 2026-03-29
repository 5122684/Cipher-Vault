/* ==========================
   INDEXEDDB VAULT DATABASE
========================== */

const DB_NAME = "CipherVaultDB";
const STORE_NAME = "vaults";

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);

        request.onupgradeneeded = function(e) {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };

        request.onsuccess = function(e) {
            resolve(e.target.result);
        };

        request.onerror = function() {
            reject("Database error");
        };
    });
}

async function saveToVault(code, data) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(data, code);
        
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    });
}

async function getFromVault(code) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(code);
        
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

async function deleteFromVault(code) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const req = store.delete(code);
        
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    });
}