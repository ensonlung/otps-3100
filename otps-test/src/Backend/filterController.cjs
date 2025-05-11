
const { db } = require('./firebase.cjs');

const timeToMinutes = (time) => {
  if (!time || time === 'Any') return null;
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

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

const isRangeOverlap = (postStart, postEnd, startTime, endTime) => {
  const postStartMinutes = timeToMinutes(postStart);
  const postEndMinutes = timeToMinutes(postEnd);
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  if (startMinutes === null && endMinutes !== null) {
    return postEndMinutes >= endMinutes && postStartMinutes <= endMinutes;
  }

  if (startMinutes !== null && endMinutes === null) {
    return postStartMinutes <= startMinutes && postEndMinutes >= startMinutes;
  }

  return postEndMinutes >= endMinutes && postStartMinutes <= startMinutes;
};

const filterController = {
  filterPost: async (req, res) => {
    const { subject, gender, district, day, startTime, endTime, fee, uname, getHide } = req.body;
    try {
      let posts = [];
      const postRef = getHide ? await db.collection('post') : await db.collection('post').where('postContent.isHide', '==', false);

      // Gender filter
      let names = [];
      if (gender && gender !== 'Any') {
        const userSnapshot = await db.collection('account').where('userInfo.gender', '==', gender).get();
        names = userSnapshot.docs.map(doc => doc.data().userInfo.username).filter(name => name);
        if (names.length === 0) {
          return res.status(200).json({ posts: [] });
        }
      }

      const subjectResults = new Map();
      const districtResults = new Map();
      const dayResults = new Map();

      let baseQuery = postRef;
      if (names.length > 0) {
        const batches = [];
        for (let i = 0; i < names.length; i += 10) {
          const batchNames = names.slice(i, i + 10);
          let q = postRef.where('postContent.username', 'in', batchNames);
          if (uname && uname !== 'Any') {
            q = q.where('postContent.username', '==', uname);
          }
          batches.push(q.get());
        }
        const snapshots = await Promise.all(batches);
        snapshots.forEach(snapshot => {
          snapshot.docs.forEach(doc => {
            const docData = { id: doc.id, ...doc.data().postContent };
            if (subject && subject !== 'Any' && docData.subject?.includes(subject)) {
              subjectResults.set(doc.id, docData);
            }
            if (district && district !== 'Any' && docData.district?.includes(district)) {
              districtResults.set(doc.id, docData);
            }
            if (day && day !== 'Any' && docData.day?.includes(day)) {
              dayResults.set(doc.id, docData);
            }
            if (subject === 'Any' && district === 'Any' && day === 'Any') {
              subjectResults.set(doc.id, docData);
            }
          });
        });
      } else {
        if (uname && uname !== 'Any') {
          baseQuery = baseQuery.where('postContent.username', '==', uname);
        }
        const snapshot = await baseQuery.get();
        snapshot.docs.forEach(doc => {
          const docData = { id: doc.id, ...doc.data().postContent };
          if (subject && subject !== 'Any' && docData.subject?.includes(subject)) {
            subjectResults.set(doc.id, docData);
          }
          if (district && district !== 'Any' && docData.district?.includes(district)) {
            districtResults.set(doc.id, docData);
          }
          if (day && day !== 'Any' && docData.day?.includes(day)) {
            dayResults.set(doc.id, docData);
          }
          if (subject === 'Any' && district === 'Any' && day === 'Any') {
            subjectResults.set(doc.id, docData);
          }
        });
      }

      let allPosts = new Map();
      const resultSets = [];
      if (subject && subject !== 'Any') resultSets.push(subjectResults);
      if (district && district !== 'Any') resultSets.push(districtResults);
      if (day && day !== 'Any') resultSets.push(dayResults);

      if (resultSets.length > 0) {
        let intersectingIds = new Set(resultSets[0].keys());
        for (let i = 1; i < resultSets.length; i++) {
          const currentIds = new Set(resultSets[i].keys());
          intersectingIds = new Set([...intersectingIds].filter(id => currentIds.has(id)));
        }
        intersectingIds.forEach(id => {
          allPosts.set(id, resultSets[0].get(id));
        });
      } else if (subject === 'Any' && district === 'Any' && day === 'Any') {
        allPosts = subjectResults;
      }

      posts = Array.from(allPosts.values());

      if (posts.length === 0) {
        return res.status(200).json({ posts: [] });
      }

      posts.sort((a, b) => {
        const timeA = a.createdAt ? a.createdAt.toDate().getTime() : 0;
        const timeB = b.createdAt ? b.createdAt.toDate().getTime() : 0;
        return timeB - timeA;
      });

      if (startTime !== 'Any' || endTime !== 'Any') {
        posts = posts.filter(post => {
          const postStartTime = post.startTime; 
          const postEndTime = post.endTime; 
          return isRangeOverlap(postStartTime, postEndTime, startTime, endTime);
        });
      }

      if (fee && fee !== 'Any') {
        posts = posts.filter(post => {
          const feeValue = parseInt(post.fee, 10);
          if (isNaN(feeValue)) return false;
          switch (fee) {
            case "<$150":
              return feeValue < 150;
            case "$150-$249":
              return feeValue >= 150 && feeValue < 250;
            case "$250-$349":
              return feeValue >= 250 && feeValue < 350;
            case ">=$350":
              return feeValue >= 350;
            default:
              return true;
          }
        });
      }

      const finalPosts = await Promise.all(
        posts.map(async (post) => {
          const record = await getRecordByName(post.username);
          const formattedStartTime = formatTimeTo12Hour(post.startTime);
          const formattedEndTime = formatTimeTo12Hour(post.endTime);
          return {
            id: post.id,
            username: post.username,
            name: record ? `${record["last name"]}${record["first name"]}` : 'Unknown',
            subject: post.subject || [],
            gender: record?.gender || 'Unknown',
            day: post.day || [],
            district: post.district || [],
            time: formattedStartTime && formattedEndTime ? `${formattedStartTime} - ${formattedEndTime}` : 'Not specified',            fee: post.fee || 'Not specified',
            contact: record?.["phone number"] || "Not Spec",
            selfIntro: post.selfIntro || "None",
          };
        })
      );

      return res.status(200).json({ posts: finalPosts });
    } catch (error) {
      console.error('Error filtering posts:', error);
      res.status(500).json({ error: 'Failed to filter posts' });
    }
  },
};

async function getRecordByName(name) {
  try {
    const userQuery = await db.collection('account').where('userInfo.username', '==', name).get();
    if (userQuery.empty) return null;
    const userData = userQuery.docs[0].data();
    return userData.userInfo;
  } catch (error) {
    console.error('Error fetching record for name', name, ':', error);
    return null;
  }
}

module.exports = filterController;