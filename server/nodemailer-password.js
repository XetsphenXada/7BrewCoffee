import "dotenv/config";
import nodemailer from "nodemailer"

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use SSL
    auth: {
      user: process.env.EMAIL_USERNAME, //sender gmail adress
      pass: process.env.APP_PASSWORD, // App password from Gmail account
    },
  });

  // Configure the mailoptions object
  const mailOptions = {
    from: "7brewnoreplytest@gmail.com",
    to: "david.lucas95@gmail.com",
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };

  const sendMail = async (transporter, mailOptions) => {
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email has been sent");
    } catch (error) {
      console.error(error);
    }
  };

  sendMail(transporter, mailOptions);

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
