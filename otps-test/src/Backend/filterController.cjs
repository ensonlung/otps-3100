const { db } = require('./firebase.cjs');

const filterController = {
    filterPost: async (req, res) => {
      const { subject } = req.body;
      const { gender } = req.body;
      const { district } = req.body;
      const { day } = req.body;
      const { time } = req.body;
      const { fee } = req.body;
      const { uname } = req.body;
        try {
          let postRef = db.collection('post');
          if (gender != 'All'){
            const userSnapshot = await db.collection('account').where(gender, '==', gender).get();
            const names = [];
            userSnapshot.forEach(user => {
                names.push(user);
            });
            postRef = postRef.where('postContent.username', 'in', names);
          }
          if (uname != 'All')
              postRef = postRef.where('postContent.username', '==', uname);
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
          const querySnapshot = await postRef.get();
          const filteredPosts = await Promise.all(
            querySnapshot.docs.map(async (doc) => {
              const postData = doc.data().postContent;
              const record = await getRecordByName(postData.username);

              return {
                id: postData.id,
                username: postData.username,
                name: record["last name"] + record["first name"],
                subject: postData.subject,
                gender: record.gender,
                day: postData.day,
                district: postData.district,
                fee: postData.fee,
                contact: record["phone number"],
              };
            })
          );
          return res.status(201).json({ posts: filteredPosts });
        } 
        catch (error) {
          console.log(error);
          res.status(500).json({ error });
        }
    },
};

async function getRecordByName(name) {
  try {
    const userQuery = await db.collection('account').where('userInfo.username', '==', name).get();
    const userData = userQuery.docs[0].data();
    return userData.userInfo;
  } catch (error) {
    console.error('Error fetching gender for name', name, ':', error);
    return undefined;
  }
}

module.exports = filterController;