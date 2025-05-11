const { db } = require('./firebase.cjs');

const commentController = {
    createComment: async (req, res) => {
        try {
          const { comment } = req.body;
          const { rating } = req.body;
          const { tutorName } = req.body;
          console.log(comment, rating);
          await db.collection('comment').add({"comment": comment, "rating": rating, "tutor name": tutorName});
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
        const commentRef = await db.collection('comment').where('tutor name', '==', tutorName);
        const querySnapshot = await commentRef.get();
        const tutorFeedbacks = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            return {
                rating: data.rating,
                comment: data.comment,
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