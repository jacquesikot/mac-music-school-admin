import { db } from './index';

const registerStudent = async (details) => {
  const user = await db.collection('students').add({
    wardName: details.wardName,
    email: details.email,
    phone: details.phone,
    name: details.name,
    age: details.age,
    gender: details.gender,
    instrument: details.instrument,
    experience: details.experience,
    created_at: new Date().toISOString(),
  });
  return user.id;
};

const getAllStudents = async () => {
  const data = [];

  const studentsRef = db.collection('students');
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

const deleteStudent = async (id) => {
  await db.collection('students').doc(id).delete();
};

export { registerStudent, getAllStudents, deleteStudent };
