const { db } = require('./firebase.cjs');

const filterController = {
    removePost: async (req, res) => {

    },
    removeFeedback: async (req, res) => {

    },
    removeUser: async (req, res) => {

    },
    ignore: async (req, res) => {
        const { id } = req.body;
        try {
            console.log(id);
            await db.collection('report record').doc(id).delete();
            res.status(201).json({ success: true});
        } catch (error) {
            console.error('Error ignore:', error);
            res.status(500).json({ error: 'Server error' });
        }
    },
}

module.exports = filterController;