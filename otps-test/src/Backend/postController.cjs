const { db } = require('./firebase.cjs');
const admin = require('firebase-admin');

const postController = {
    createPost: async (req, res) => {
        try {
          const { postContent } = req.body;
          console.log("post", postContent);
          const docRef = await db.collection('post').add({ postContent });
          await docRef.update({ 'postContent.id': docRef.id });       
          await docRef.update({ 'postContent.createdAt': admin.firestore.FieldValue.serverTimestamp() });  
          res.status(201).json({ id: docRef.id, message: 'Document added' });
        } 
        catch (error) {
          console.log(error);
          res.status(500).json({ error });
        }
    },
};

module.exports = postController;