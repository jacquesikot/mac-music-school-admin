import { db } from './index';

const logTimeIn = async (id) => {
  const today = new Date();

  const data = {
    student_id: id,
    time_in_month: today.getMonth(),
    time_in_day: today.getDay(),
    time_in_year: today.getFullYear(),
    time_out_month: '',
    time_out_day: '',
    time_out_year: '',
  };

  await db.collection('attendance').add(data);
};

const logTimeOut = async (id) => {
  const today = new Date();

  const res = await db
    .collection('attendance')
    .where('student_id', '==', id)
    .where('time_in_month', '==', today.getMonth())
    .where('time_in_day', '==', today.getDay())
    .where('time_in_year', '==', today.getFullYear())
    .get();

  await db.collection('attendance').doc(res.uid).add({
    time_out_month: today.getMonth(),
    time_out_day: today.getDay(),
    time_out_year: today.getFullYear(),
  });
};

const getTodayRecord = async (id) => {};

export { logTimeIn, logTimeOut };
