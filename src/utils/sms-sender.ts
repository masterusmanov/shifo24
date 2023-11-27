import axios from 'axios';

const sendSmsTo = async (receiver, message_key: string, genNumber) => {
  const postData = {
    messages: [
      {
        recipient: `${receiver}`,
        'message-id': `${message_key}`,
        sms: {
          originator: '3700',
          content: {
            text: `SHIFO24: Sizning verifikatsiya kodingiz: ${genNumber} \n\n ${message_key}`,
          },
        },
      },
    ],
  };

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: process.env.SMS_BASIC_TOKEN,
    },
  };

  axios
    .post('https://send.smsxabar.uz/broker-api/send', postData, axiosConfig)
    .then((res) => {})
    .catch((error) => {
      new Error(error);
      console.log('ERROR: ', error);
    });
};

export default sendSmsTo;
