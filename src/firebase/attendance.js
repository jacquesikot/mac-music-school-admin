import { db } from './index';

const logTimeIn = async (id) => {
  const today = new Date();

  const data = {
    student_id: id,
    time_in_month: today.getMonth(),
    time_in_day: today.getDay(),
    time_in_year: today.getFullYear(),
    time_in_ms: today.getTime(),
    time_in_full: today,
    time_out_month: '',
    time_out_day: '',
    time_out_year: '',
    time_out_ms: '',
    time_out_full: '',
  };

  await db.collection('attendance').add(data);
};

const getTodaysRecord = async (id) => {
  const today = new Date();

  const data = [];

  const attendanceRef = db.collection('attendance');
  const snapshot = await attendanceRef
    .where('student_id', '==', id)
    .where('time_in_month', '==', today.getMonth())
    .where('time_in_day', '==', today.getDay())
    .where('time_in_year', '==', today.getFullYear())
    .get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    return null;
  }

  snapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
};

const logTimeOut = async (id) => {
  const today = new Date();

  const res = await getTodaysRecord(id);

  await db.collection('attendance').doc(res[0].id).update({
    time_out_month: today.getMonth(),
    time_out_day: today.getDay(),
    time_out_year: today.getFullYear(),
    time_out_ms: today.getTime(),
    time_out_full: today,
  });
};

export { logTimeIn, logTimeOut, getTodaysRecord };
