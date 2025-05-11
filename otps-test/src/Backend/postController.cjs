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
          await docRef.update({ 'postContent.isHide': false });  
          res.status(201).json({ id: docRef.id, message: 'Document added' });
        } 
        catch (error) {
          console.log(error);
          res.status(500).json({ error });
        }
    },
    getPost: async (req, res) => {
      try {
        const { id } = req.body;
        const postRef = await db.collection('post').doc(id).get();
        res.status(201).json({ post: postRef.data().postContent });
      } catch (error){
        console.log(error);
        res.status(500).json({ error });
      }
    },
    updatePost: async (req, res) => {
      try {
        const { id, subject, district, day, startTime, endTime, fee, selfIntro } = req.body;
        const postRef = await db.collection('post').doc(id);
        postRef.update({"postContent.subject": subject});
        postRef.update({"postContent.district": district});
        postRef.update({"postContent.day": day});
        postRef.update({"postContent.startTime": startTime});
        postRef.update({"postContent.endTime": endTime});
        postRef.update({"postContent.fee": fee});
        postRef.update({"postContent.selfIntro": selfIntro});
        res.status(201).json({ success: true });
      } catch (error){
        console.log(error);
        res.status(500).json({ error });
      }
    },
    deletePost: async (req, res) => {
      try {
        const { id } = req.body;
        const docRef = await db.collection('post').doc(id).delete(); 
        res.status(201).json({ success: true });
      } 
      catch (error) {
        console.log(error);
        res.status(500).json({ error });
      }
    },
    hidePost: async (req, res) => {
      try {
        const { id } = req.body;
        const docRef = await db.collection('post').doc(id);
        const hide = (await docRef.get()).data().postContent.isHide;
        await docRef.update('postContent.isHide', !hide);
        res.status(201).json({ success: true });
      } 
      catch (error) {
        console.log(error);
        res.status(500).json({ error });
      }
    },
};

module.exports = postController;