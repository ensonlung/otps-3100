const { db } = require('./firebase.cjs');

const registerController = {
    registerAccount: async (req, res) => {
        try {
          const { studentInfo } = req.body;
          console.log("receive", studentInfo);
          const docRef = await db.collection('student').add({ studentInfo });
          res.status(201).json({ id: docRef.id, message: 'Document added' });
        } 
        catch (error) {
          console.log(error);
          res.status(500).json({ error });
        }
    },
    verifyUsername: async (req, res) => {
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
    },
};

module.exports = registerController;