const { db } = require('./firebase.cjs');

const registerController = {
    registerAccount: async (req, res) => {
        try {
          const { userInfo } = req.body;
          console.log("receive", userInfo);
          const docRef = await db.collection('account').add({ userInfo });
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
        const userRef = db.collection('account');
        const snapshot = await userRef.where('userInfo.username', '==', username).get();  
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