import axios from 'axios';

const sendSmsTo = async (receiver, message_key: string, genNumber) => {
  const postData = {
    mobile_phone: receiver,
    message: `SHIFO24: Sizning verifikatsiya kodingiz: ${genNumber} \n\n ${message_key}`,
    from: '4546',
  };

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${process.env.SMS_TOKEN}`,
    },
  };

  axios
    .post('https://notify.eskiz.uz/api/message/sms/send', postData, axiosConfig)
    .then((res) => {})
    .catch((error) => {
      new Error(error);
      console.log('ERROR: ', error);
    });
};

export default sendSmsTo;