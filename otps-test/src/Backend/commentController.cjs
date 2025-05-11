const { db } = require('./firebase.cjs');
const admin = require('firebase-admin');

const commentController = {
    createComment: async (req, res) => {
        try {
          const { comment } = req.body;
          const { rating } = req.body;
          const { tutorName } = req.body;
          const { username } = req.body;
          console.log(comment, rating, tutorName, username);
          const docRef = await db.collection('comment').add({"commentInfo" :{"comment": comment, "rating": rating, "tutorName": tutorName, "commentor": username}});
          await docRef.update({ 'commentInfo.id': docRef.id });           
          await docRef.update({ 'commentInfo.createdAt': admin.firestore.FieldValue.serverTimestamp() });  
          
          res.status(201).json({ message: 'comment added' });
        } 
        catch (error) {
          console.log(error);
          res.status(500).json({ error });
        }
    },
    getComment: async (req, res) => {
      try {
        const { tutorName } = req.body;
        const commentRef = await db.collection('comment').where('commentInfo.tutorName', '==', tutorName);
        commentRef.orderBy('commentInfo.createdAt', 'desc');
        const querySnapshot = await commentRef.get();
        const tutorFeedbacks = await Promise.all(
          querySnapshot.docs.map((doc) => {
            const data = doc.data().commentInfo;
            return {
                id: data.id,
                rating: data.rating,
                comment: data.comment,
                createdAt: data.createdAt,
                commentor: data.commentor,
            };
          })
        );
        res.status(201).json({ feedbacks: tutorFeedbacks });
      } catch (error){
        console.log(error);
        res.status(500).json({ error });
      }
    },
};

module.exports = commentController;