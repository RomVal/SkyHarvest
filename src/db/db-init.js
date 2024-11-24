import admin from 'firebase-admin';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { logger } from './../logger.js';

// Helper to get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Asynchronously reads and parses the service account JSON file.
 *
 * @async
 * @function getServiceAccount
 * @returns {Promise<Object>} A promise that resolves to the service account object.
 * @throws Will throw an error if the file cannot be read or parsed.
 */
async function getServiceAccount() {
  try {
    const filePath = path.join(__dirname, '../../serviceAccountKey.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const serviceAccount = JSON.parse(data);
    return serviceAccount;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error reading service account JSON:', error);
    throw error;
  }
}

try {
  const serviceAccount = await getServiceAccount();
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  logger.error('Error initializing Firebase', {
    message: error?.message,
  });
}

export const db = admin.firestore();
// eslint-disable-next-line no-console
console.log('Firebase successfully initialized');
