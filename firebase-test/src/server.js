const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = require('../../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());

const addUser = async () => {
  try {
    const docRef = await db.collection('users').add({
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 25,
    });
    console.log('User added with ID:', docRef.id);
  } catch (error) {
    console.error('Error adding document:', error);
  }
};

app.post('/api/test', async (req, res) => {
  try {
    const { test } = req.body;
    const docRef = await db.collection('test').add({ test });
    res.status(201).json({ id: docRef.id, message: 'Document added' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

addUser();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));