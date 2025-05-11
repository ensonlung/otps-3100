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
          let subjectRef = postRef;
          if (subject !== 'All')
            subjectRef = postRef.where('postContent.subject', 'array-contains', subject);
          let districtRef = postRef;
          if (district !== 'All')
            districtRef = postRef.where('postContent.district', 'array-contains', district);
          let dayRef = postRef;
          if (day !== 'All')
            dayRef = postRef.where('postContent.day', 'array-contains', day);

          const [subjectDocs, districtDocs, dayDocs] = await Promise.all([
            subjectRef.get(),
            districtRef.get(),
            dayRef.get(),
          ]);
          const subjectData = subjectDocs.docs.map(doc => ({
            id: doc.data().postContent.id,
            ...doc.data().postContent,
          }));
          const districtData = districtDocs.docs.map(doc => ({
            id: doc.data().postContent.id,
            ...doc.data().postContent,
          }));
          const dayData = dayDocs.docs.map(doc => ({
            id: doc.data().postContent.id,
            ...doc.data().postContent,
          }));
          const subjectIds = new Set(subjectData.map(doc => doc.id));
          const districtIds = new Set(districtData.map(doc => doc.id));
          const dayIds = new Set(dayData.map(doc => doc.id));

          const intersectedIds = [...subjectIds].filter(
            id => districtIds.has(id) && dayIds.has(id)
          );
          const intersectedDocs = subjectData.filter(doc => intersectedIds.includes(doc.id));
          
          const filteredPosts = await Promise.all(
            intersectedDocs.map(async (doc) => {
              const postData = doc;
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