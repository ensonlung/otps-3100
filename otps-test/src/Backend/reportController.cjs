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
    fetchPostReport: async (req, res) => {
        try {
            const rePostRef = await db.collection('report record').where('target', '==', 'Post').get();
            const rePosts = rePostRef.docs.map(rePost => ({
                id: rePost.data().id,
                reportReason: rePost.data()["report reason"],
                reportSpecialReason: rePost.data()["report special reason"],
            }));
            const postSnapshot = await db.collection('post').get();
            const dbRecords = postSnapshot.docs.map(doc => ({
                ...doc.data().postContent,
            }));
            // console.log(rePosts);
            const joinRePost = rePosts.map(rePost => {
                const post = dbRecords.find(dbRecord => dbRecord.id == rePost.id);
                if (post){
                    return {
                        postCon: post,
                        reportDetails: rePost,
                    };
                }
                return null;
            }).filter(record => record !== null);
            res.status(201).json({ posts: joinRePost });
        } catch (error){
            console.log(error);
            res.status(500).json({ error });
        }
    },
};

module.exports = reportController;