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
};

module.exports = commentController;