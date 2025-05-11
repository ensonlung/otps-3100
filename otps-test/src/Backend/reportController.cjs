const { db } = require('./firebase.cjs');

const reportController = {
    report: async (req, res) => {
        try {
            const { target } = req.body;
            const { reportReason } = req.body;
            const { reportSpecifcReason } = req.body;

            const docRef = await db.collection('report record').add({  });
        } 
        catch (error) {
          console.log(error);
          res.status(500).json({ error });
        }
    },
};

module.exports = reportController;