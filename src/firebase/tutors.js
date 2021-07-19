import { db } from './index';

const registerTutor = async (details) => {
  const user = await db.collection('tutors').add({
    name: details.name,
    email: details.email,
    phone: details.phone,
    gender: details.gender,
    instrument: details.instrument,
    created_at: new Date().toISOString(),
  });
  return user.id;
};

const getAllTutors = async () => {
  const data = [];

  const studentsRef = db.collection('tutors');
  const snapshot = await studentsRef.get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    return null;
  }

  snapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
};

const deleteTutor = async (id) => {
  await db.collection('tutors').doc(id).delete();
};

export { registerTutor, getAllTutors, deleteTutor };
