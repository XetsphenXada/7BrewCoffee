import nodemailer from "nodemailer"
import "dotenv/config";


// let singleConfig = "smtps://7brewnoreplytest:7BrewCoffee123@smtp.mail.google.com/?pool=false";

// Import the Nodemailer library
// const nodemailer = require('nodemailer');

// Create a transporter object
// async function resetEmail() {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use SSL
    auth: {
      // user: process.env.EMAIL_USERNAME, //sender gmail adress
      // pass: process.env.APP_PASSWORD, // App password from Gmail account
      user:"7brewnoreplytest@gmail.com",
      pass:"tgkt owcs pldk pwec",
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

  // Send the email
  // transporter.sendMail(mailOptions, function(error, info){
  //   if (error) {
  //     console.log('Error:', error);
  //   } else {
  //     console.log('Email sent:', info.response);
  //   }
  // });

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
// }
