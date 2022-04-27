const nodemailer = require('nodemailer');

const transporter  = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a1af2b4cb6cf12",
      pass: "1514dbb7c8772e"
    }
  });

module.exports = transporter ;