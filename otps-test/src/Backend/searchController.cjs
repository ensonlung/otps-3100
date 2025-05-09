const { db } = require('./firebase.cjs');

const searchController = {
    searchRelevantName: async (req, res) => {
        const { name } = req.body;
        try {
            const userRef = db.collection('student');
            const snapshot = await userRef.get(); // Fetch all documents
            const matchingRecords = [];

            snapshot.forEach(doc => {
                const studentInfo = doc.data().studentInfo;
                if (studentInfo && (studentInfo.username.toLowerCase().includes(name.toLowerCase()) || studentInfo.name.toLowerCase().includes(name.toLowerCase()))) 
                    matchingRecords.push(studentInfo);
            });
          return res.json({matchingRecords});
        } catch (error) {
          console.error('Error checking login information:', error);
          res.status(500).json({ error: 'Server error' });
        }
    },
};

module.exports = searchController;