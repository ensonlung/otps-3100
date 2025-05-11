const { db } = require('./firebase.cjs');

const filterController = {
    removePost: async (req, res) => {
        const { id } = req.body;
        try {
            const ref = await db.collection('report record').where('reportId', '==', id).get();
            const postId = ref.docs[0].data().id;
            await db.collection('post').doc(postId).delete();
            await db.collection('report record').doc(id).delete();
            res.status(201).json({ success: true});
        } catch (error) {
            console.error('Error ignore:', error);
            res.status(500).json({ error: 'Server error' });
        }
    },
    removeFeedback: async (req, res) => {
        const { id } = req.body;
        try {
            const ref = await db.collection('report record').where('reportId', '==', id).get();
            const feedbackId = ref.docs[0].data().id;
            await db.collection('comment').doc(feedbackId).delete();
            await db.collection('report record').doc(id).delete();
            res.status(201).json({ success: true});
        } catch (error) {
            console.error('Error ignore:', error);
            res.status(500).json({ error: 'Server error' });
        }
    },
    removeUser: async (req, res) => {
        const { id } = req.body;
        try {
            // const ref = await db.collection('report record').where('reportId', '==', id).get();
            // let userId;
            // if (ref.docs[0].data().target == "Post"){
            //     const postId = ref.docs[0].data().id;
            //     const postRef = await db.collection('post').doc(postId).get();
            //     const username = postRef.docs[0].data().postContent.username;
            //     const accRef = await db.collection('account').where('username', '==', username).get();
            //     userId = accRef.docs[0].id;
            // }
            // else {
            //     const feedback = ref.docs[0].data().id;
            //     const postRef = await db.collection('post').doc(id).get();
            //     const username = postRef.docs[0].data().postContent.username;
            //     const accRef = await db.collection('account').where('username', '==', username).get();
            //     userId = accRef.docs[0].id;
            // }
            // await db.collection('account').doc(userId).delete();
            // await db.collection('report record').doc(id).delete();
            res.status(201).json({ success: true});
        } catch (error) {
            console.error('Error ignore:', error);
            res.status(500).json({ error: 'Server error' });
        }
    },
    ignore: async (req, res) => {
        const { id } = req.body;
        try {
            await db.collection('report record').doc(id).delete();
            res.status(201).json({ success: true});
        } catch (error) {
            console.error('Error ignore:', error);
            res.status(500).json({ error: 'Server error' });
        }
    },
}

module.exports = filterController;