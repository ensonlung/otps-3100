const { db } = require('./firebase.cjs');

const loginController = {
    verifyLogin: async (req, res) => {
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
  },
}

module.exports = loginController;