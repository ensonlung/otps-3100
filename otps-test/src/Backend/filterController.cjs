const { db } = require('./firebase.cjs');

const filterController = {
    filterPost: async (req, res) => {
      const { subject } = req.body;
      const { gender } = req.body;
      const { district } = req.body;
      const { day } = req.body;
      const { time } = req.body;
      const { fee } = req.body;
        try {
          let postRef = await db.collection('post');
          if (gender != 'All'){
            const userSnapshot = await db.collection('account').where(gender, '==', gender).get();
            const names = [];
            userSnapshot.forEach(user => {
                names.push(user);
            });
            postRef = postRef.where('postContent.username', 'in', names);
          }
          if (subject !== 'All')
            postRef = postRef.where('postContent.subject', 'array-contains', subject);
          if (district !== 'All')
            postRef = postRef.where('postContent.district', 'array-contains', district);
          if (day !== 'All')
            postRef = postRef.where('postContent.', 'array-contains', day);
          switch (fee){
            case "<$150":
              postRef = postRef.where('postContent.fee', '<', 150);
              break;
            case "$150-$249":
              postRef = postRef.where('postContent.fee', '>=', 150).where('postContent.fee', '<', 250);
              break;
            case "$250-$349":
              postRef = postRef.where('postContent.fee', '>=', 250).where('postContent.fee', '<', 350);
              break;
            case ">=$350":
              postRef = postRef.where('postContent.fee','>=', 350);
              break;
          }
          const filteredPost = [];
          postRef.get().then((querySnapshot) => {
            querySnapshot.forEach(post => {
              filteredPost.push({
                name: post.name,
                subject: post.subject,
                gender: post.gender,
                day: post.day,
                district: post.district,
                fee: post.fee,
              });
            });
          });
          
          return res.status(201).json({ posts: filteredPost });
        } 
        catch (error) {
          console.log(error);
          res.status(500).json({ error });
        }
    },
};

module.exports = filterController;