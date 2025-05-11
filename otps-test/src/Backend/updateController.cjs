const { db } = require('./firebase.cjs');

const updateController = {
    updateInfo: async (req, res) => {
        try {
          const { username } = req.body;
          const { updatedInfo } = req.body;
          
          const docRef = await db.collection('account').where('userInfo.username', '==', username).get();
          const userid = docRef.docs[0].id;
          const userRef = await db.collection('account').doc(userid);
          
          await userRef.update({ 'userInfo.last name': updatedInfo["last name"] });
          await userRef.update({ 'userInfo.first name': updatedInfo["first name"] });
          await userRef.update({ 'userInfo.gender': updatedInfo["gender"] });
          await userRef.update({ 'userInfo.email': updatedInfo["email"] });
          await userRef.update({ 'userInfo.bday': updatedInfo["bday"] });
          await userRef.update({ 'userInfo.phone number': updatedInfo["phone number"] });

          res.status(201).json({ message: 'user info updated' });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error });
        }
    },
};

module.exports = updateController;