const nodemailer = require('nodemailer');

// Create a transporter object for the open SMTP server
const transporter = nodemailer.createTransport({
    host: 'mailserver',
    port: 25, 
  // host: 'localhost',
   // port: 2525, // Typically, SMTP servers use port 587 for TLS/STARTTLS
    secure: false, // Set to true for SSL
    ignoreTLS: true, // Ignore TLS/STARTTLS (not recommended)
});

// Define email data
const mailOptions = {
    from: 'games@mailserver.com',
    to: '',
    subject: '',
    text: '',
};

module.exports.send = async function (subject, content, recipient) {
    // Set email data
    mailOptions.subject = subject;
    mailOptions.text = content;
    mailOptions.to = recipient;
  
    try {
      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
};