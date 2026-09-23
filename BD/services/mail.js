const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: "465",
    secure: "true",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})


// const sendMail = async() => {
//      const info = await transporter.sendMail({
//     from: `"Backend" <${process.env.EMAIL_USER}>`, // sender name + address
//     to,                  
//     subject,               
//     text              // plain text version
//     // html: "<h1>Thank you for signing up!</h1>",      // HTML version
//   });

// }

async function sendEmail({ to, subject, text, html }) {
  const mailOptions = {
    from: `"TicketNG" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("✅ Email sent:", info.messageId);
  return info;
}


module.exports = sendEmail;