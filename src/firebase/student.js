import { db } from './index';

const registerStudent = async (details) => {
  await db.collection('students').add({
    email: details.email,
    phone: details.phone,
    name: details.name,
    age: details.age,
    gender: details.gender,
    instrument: details.instrument,
    created_at: new Date().toISOString(),
  });
};

export { registerStudent };
