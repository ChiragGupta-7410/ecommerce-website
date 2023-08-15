const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const mailTransport = nodeMailer.createTransport({
    host: process.env.SHOP_EMAIL_SERVICE_HOST,
    port: process.env.SHOP_EMAIL_SERVICE_PORT,
    service: process.env.SHOP_EMAIL_SERVICE,
    auth: {
      user: process.env.SHOP_EMAIL,
      pass: process.env.SHOP_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SHOP_EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.emailBody,
  };

  await mailTransport.sendMail(mailOptions);
};

module.exports = sendEmail;
