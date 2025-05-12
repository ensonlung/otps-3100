const { db } = require('./firebase.cjs');

const licenseController = {
    checkLicense: async (req, res) => {
        const { license } = req.body;
        try {
            const licenseRef = db.collection('license');
            const snapshot = await licenseRef.where('license', '==', license).get();
            if (!snapshot.empty) {
                return res.json({ exists: true });
            }
                return res.json({ exists: false });
        } 
        catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    },
};

module.exports = licenseController;