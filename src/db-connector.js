import admin from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

console.log('Firebase successfully initialized');

export async function addRecordtoCity(cityName, timestamp, cityData) {
  try {
    const userRef = db.collection(cityName).doc(timestamp);

    await userRef.set(cityData);

    console.log(`Record for ${cityName} ${timestamp} sucessfully added.`);
  } catch (error) {
    console.error('Error when adding city data', error);
  }
}
