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

export { registerStudent };
