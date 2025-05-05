
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/students/register', async (req, res) => {
  try {
    const { studentInfo } = req.body;
    console.log("receive", studentInfo);
    const docRef = await db.collection('student').add({ studentInfo });
    res.status(201).json({ id: docRef.id, message: 'Document added' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));