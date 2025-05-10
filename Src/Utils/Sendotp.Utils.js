const { default: axios } = require("axios");
const ApiError = require("./ApiError.Utils");

exports.sendSMS = async (phone, otp) => {
  const formattedPhone = phone.replace("+", "");
  const apiKey = "56446506F5908D";
  const sender = "JAYRTI";
  const template = "1707168308995582078";

  const message = ` Thank You for Registering with us. Kindly Submit Your OTP to Proceed Further ${otp} is Valid for next 10 Mins. Thanks and Regards Taruna Infosoft and Team`;

  try {
    const response = await axios({
      method: "post",
      url: "http://sms.tarunainfosoft.com/app/smsapi/index.php",
      params: {
        key: apiKey,
        campaign: "9045",
        routeid: "18",
        type: "text",
        contacts: formattedPhone,
        senderid: sender,
        msg: message,
        template_id: template,
      },
      timeout: 500000,
    });

    console.log(`SMS sent to ${formattedPhone} with OTP: ${otp}`);
    console.log("Delivery Status:", response.data);

    return response.data;
  } catch (error) {
    console.log("SMS Gateway Response:", error.response?.data);
    throw new ApiError(404, `${error}`);
  }
};
