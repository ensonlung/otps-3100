
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

app.post('/api/check-username', async (req, res) => {
  const { username } = req.body;
  try {
    const userRef = db.collection('student');
    const snapshot = await userRef.where('studentInfo.username', '==', username).get();  
    if (!snapshot.empty) {
      return res.json({ exists: true });
    }
    return res.json({ exists: false });
  } catch (error) {
    console.error('Error checking username:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


app.post('/api/check-login', async (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  try {
    const userRef = db.collection('student');
    const snapshot = await userRef.where('studentInfo.username', '==', username).where('studentInfo.password', '==', password).get();  
    if (!snapshot.empty) {
      return res.json({ success: true });
    }
    return res.json({ success: false });
  } catch (error) {
    console.error('Error checking login information:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));