import admin from 'firebase-admin';
import serviceAccount from '../../serviceAccountKey.json' assert { type: 'json' };

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

export const db = admin.firestore();

console.log('Firebase successfully initialized');
