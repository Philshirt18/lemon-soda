// Everything lives on this device. Small values: localStorage. The photo: IndexedDB.
const PREFIX = 'lemonsoda.';
const memory = {};

export function getItem(key) {
  try {
    const v = localStorage.getItem(PREFIX + key);
    return v === null ? memory[key] ?? null : v;
  } catch {
    return memory[key] ?? null;
  }
}

export function setItem(key, value) {
  memory[key] = String(value);
  try {
    localStorage.setItem(PREFIX + key, String(value));
  } catch {
    // Storage blocked: keep the value in memory for this visit.
  }
}

export function removeItem(key) {
  delete memory[key];
  try {
    localStorage.removeItem(PREFIX + key);
  } catch {
    // ignore
  }
}

const DB_NAME = 'lemonsoda';
const STORE = 'files';

function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveImage(blob) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put(blob, 'background');
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function loadImage() {
  try {
    const db = await openDb();
    return await new Promise((resolve, reject) => {
      const req = db.transaction(STORE).objectStore(STORE).get('background');
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

export async function clearImage() {
  try {
    const db = await openDb();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).delete('background');
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    // ignore
  }
}
