//import { usePatternFormat } from 'react-number-format';

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
    getPost: async (req, res) => {
      try {
        const { userName } = req.body;
        const PostRef = await db.collection('post').where('username', '==', userName).orderBy('createdAt', 'desc');
        const querySnapshot = await PostRef.get();
        const tutorPosts = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            return {
                id: data.postContent.id,
                //name: data.postContent.name,
                username: data.postContent.username,
                gender: data.postContent.gender,
                subject: data.postContent.subject,
                district: data.postContent.district,
                availableDays: data.postContent.availableDays,
                tuitionFee: data.postContent.tuitionFee,
                contact: data.postContent.contact,
            };
          })
        );
        res.status(201).json({ posts: tutorPosts });
      } catch (error){
        console.log(error);
        res.status(500).json({ error });
      }
    },
};

module.exports = postController;