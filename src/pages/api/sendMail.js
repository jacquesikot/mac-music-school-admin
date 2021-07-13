import axios from 'axios';

const sendMail = async (data) => {
  await axios.post('https://mms-email-server.herokuapp.com/sendMail', {
    recipient: data.email,
    wardName: data.wardName,
    studentName: data.name,
    studentClass: data.instrument,
    url: 'https://mms-admin.vercel.app/attendance',
  });
};

export default sendMail;
