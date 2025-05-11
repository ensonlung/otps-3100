const { db } = require('./firebase.cjs');

const searchController = {
    searchRelevantName: async (req, res) => {
        const { anyName } = req.body;
        try {
            const userRef = db.collection('account');
            const snapshot = await userRef.get(); 
            const matchingRecords = [];

            snapshot.forEach(doc => {
                const userInfo = doc.data().userInfo;
                if (userInfo && (userInfo.username.toLowerCase().includes(anyName.toLowerCase()) || (userInfo["last name"]+" "+userInfo["first name"]).toLowerCase().includes(anyName.toLowerCase()))) 
                  matchingRecords.push(userInfo.username);
            });
            console.log(matchingRecords);

            if (matchingRecords.length == 0){
              return res.json({ posts: [] });
            }
            const postRef = db.collection('post').where('postContent.username', 'in', matchingRecords);
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

          return res.json({ posts: filteredPosts });
        } catch (error) {
          console.error('Error Searchhhhhh', error);
          res.status(500).json({ error: 'Server error' });
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

module.exports = searchController;