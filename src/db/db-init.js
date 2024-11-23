import admin from 'firebase-admin';

// eslint-disable-next-line
import serviceAccount from '../../serviceAccountKey.json' assert { type: 'json' };
import { logger } from '../logger';

try {
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
