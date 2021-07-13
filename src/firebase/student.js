import { db } from './index';

const registerStudent = async (details) => {
  await db.collection('students').add({
    wardName: details.wardname,
    email: details.email,
    phone: details.phone,
    name: details.name,
    age: details.age,
    gender: details.gender,
    instrument: details.instrument,
    experience: details.experience,
    created_at: new Date().toISOString(),
  });
};

export { registerStudent };
