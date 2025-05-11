const { db } = require('./firebase.cjs');

const reportController = {
    report: async (req, res) => {
        try {
            const { target } = req.body;
            const { reportReason } = req.body;
            const { reportSpecialReason } = req.body;
            const { id } = req.body;
            await db.collection('report record').add({ "target": target, "id": id, "report reason": reportReason, "report special reason": reportSpecialReason});
            res.status(201).json({ success: true });
        } 
        catch (error) {
          console.log(error);
          res.status(500).json({ error });
        }
    },
};

module.exports = reportController;