const { db } = require('./firebase.cjs');

const formatTimeTo12Hour = (time) => {
  if (!time || time === 'All') return null;

  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(time)) {
    console.warn(`Invalid time format: ${time}, expected HH:MM`);
    return null;
  }

  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const adjustedHours = hours % 12 || 12; 
  return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

const searchController = {
    searchRelevantName: async (req, res) => {
        const { anyName } = req.body;
        try {
            const userRef = db.collection('account');
            const snapshot = await userRef.get(); 
            const matchingRecords = [];

            snapshot.forEach(doc => {
                const userInfo = doc.data().userInfo;
                if (userInfo && (userInfo.username.toLowerCase().includes(anyName.toLowerCase()) || (userInfo["last name"]+" "+userInfo["first name"]).toLowerCase().includes(anyName.toLowerCase()) || (userInfo["first name"]+" "+userInfo["last name"]).toLowerCase().includes(anyName.toLowerCase()))) 
                  matchingRecords.push(userInfo.username);
            });

            if (matchingRecords.length == 0){
              return res.json({ posts: [] });
            }
            const posts = [];
            for (let i = 0; i < matchingRecords.length; i += 10) {
              const batch = matchingRecords.slice(i, i + 10);
              const postQuery = db.collection('post')
                .where('postContent.isHide', '==', false)
                .where('postContent.username', 'in', batch);

              const querySnapshot = await postQuery.get();
              querySnapshot.docs.forEach(doc => {
                posts.push({ id: doc.id, ...doc.data().postContent });
              });
            }

            posts.sort((a, b) => {
              const timeA = a.createdAt ? a.createdAt.toDate().getTime() : 0;
              const timeB = b.createdAt ? b.createdAt.toDate().getTime() : 0;
              return timeB - timeA;
            });

            const filteredPosts = await Promise.all(
              posts.map(async (postData) => {
                const record = await getRecordByName(postData.username);
                const rating = await getAvgRatingByName(postData.username);
                const formattedStartTime = formatTimeTo12Hour(postData.startTime);
                const formattedEndTime = formatTimeTo12Hour(postData.endTime);
                return {
                  id: postData.id,
                  username: postData.username,
                  name: record["first name"] + " " + record["last name"] ,
                  subject: postData.subject,
                  gender: record.gender,
                  day: postData.day,
                  district: postData.district,
                  time: formattedStartTime && formattedEndTime ? `${formattedStartTime} - ${formattedEndTime}` : 'Not specified',
                  fee: postData.fee,
                  contact: record["phone number"],
                  selfIntro: postData.selfIntro,
                  avgRating: rating,
                  isHide: postData.isHide,
                };
              })
            );
            console.log(filteredPosts);
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

async function getAvgRatingByName(name){
  try {
    const userQuery = await db.collection('comment').where('commentInfo.tutorName', '==', name).get();
    if (userQuery.empty) 
      return '--';
    
    const ratings = userQuery.docs
      .map(doc => parseFloat(doc.data().commentInfo.rating))
      .filter(rating => !isNaN(rating));

    if (ratings.length === 0) 
      return '--';

    const totalRating = ratings.reduce((acc, num) => acc + num, 0);
    return totalRating / ratings.length;
  } catch (error) {
    console.error('Error fetching record for name', name, ':', error);
    return null;
  }
}


module.exports = searchController;