const { db } = require('./firebase.cjs');

const reportController = {
    report: async (req, res) => {
        try {
            const { target } = req.body;
            const { reportReason } = req.body;
            const { reportSpecialReason } = req.body;
            const { id } = req.body;
            const record = await db.collection('report record').add({ "target": target, "id": id, "report reason": reportReason, "report special reason": reportSpecialReason});
            await record.update({ 'reportId': record.id});  
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
                reportId: rePost.data().reportId,
                id: rePost.data().id,
                reportReason: rePost.data()["report reason"],
                reportSpecialReason: rePost.data()["report special reason"],
            }));
            const postSnapshot = await db.collection('post').get();
            const dbRecords = postSnapshot.docs.map(doc => ({
                ...doc.data().postContent,
            }));
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
    fetchFeedbackReport: async (req, res) => {
        try {
            const reFeedbackRef = await db.collection('report record').where('target', '==', 'Feedback').get();
            const reFeedbacks = reFeedbackRef.docs.map(reFeedback => ({
                reportId: reFeedback.data().reportId,
                id: reFeedback.data().id,
                reportReason: reFeedback.data()["report reason"],
                reportSpecialReason: reFeedback.data()["report special reason"],
            }));
            const feedbackSnapshot = await db.collection('comment').get();
            const dbRecords = feedbackSnapshot.docs.map(doc => ({
                ...doc.data().commentInfo,
            }));
            
            const joinReFeedback = reFeedbacks.map(reFeedback => {
                const feedback = dbRecords.find(dbRecord => dbRecord.id == reFeedback.id);
                if (feedback){
                    return {
                        feedbackCon: feedback,
                        reportDetails: reFeedback,
                    };
                }
                return null;
            }).filter(record => record !== null);
            res.status(201).json({ feedbacks: joinReFeedback });
        } catch (error){
            console.log(error);
            res.status(500).json({ error });
        }
    },
};

module.exports = reportController;