/**
 * Frontend-only photo persistence.
 * Images live in IndexedDB rather than localStorage, which has a small quota.
 * Replace this module with a signed-upload API when the backend is ready.
 */
const DATABASE_NAME = 'konekta-photos-v1';
const STORE_NAME = 'photos';
const IMAGE_PREFIX = 'local-image:';

export function isLocalImage(source: string): boolean {
  return source.startsWith(IMAGE_PREFIX);
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('Navigatè sa a pa sipòte depo foto lokal.'));
      return;
    }

    const request = indexedDB.open(DATABASE_NAME, 1);

    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Pa kapab ouvri depo foto yo.'));
  });
}

export async function saveImage(file: File): Promise<string> {
  const id = `${IMAGE_PREFIX}${crypto.randomUUID()}`;
  const database = await openDatabase();

  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, 'readwrite');
      transaction.objectStore(STORE_NAME).put(file, id);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error ?? new Error('Foto a pa sove.'));
      transaction.onabort = () => reject(transaction.error ?? new Error('Foto a pa sove.'));
    });
    return id;
  } finally {
    database.close();
  }
}

export async function loadImage(source: string): Promise<Blob | undefined> {
  if (!isLocalImage(source)) return undefined;
  const database = await openDatabase();

  try {
    return await new Promise<Blob | undefined>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, 'readonly');
      const request = transaction.objectStore(STORE_NAME).get(source);
      request.onsuccess = () => resolve(request.result as Blob | undefined);
      request.onerror = () => reject(request.error ?? new Error('Foto a pa disponib.'));
    });
  } finally {
    database.close();
  }
}
