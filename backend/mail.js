const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();
function sendMail(req, res) {
    const { to, subject, message, html, cc, bcc } = req.body;

    // Make sure that either message or html is present
    if (!message && !html) {
        return res.status(400).json({ error: 'Either message or html must be present' });
    }

    // Set up the transporter
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // Set up the email options
    const options = {
        from: process.env.EMAIL_SENDER,
        to: to,
        subject: subject
    };

    // If html is present, use it, otherwise use message
    if (html) { options.html = html; }
    else { options.message = message; }

    // If cc or bcc are present, add them to the options
    if (cc) { options.cc = cc; }
    if (bcc) { options.bcc = bcc; }

    transporter.sendMail(options, (error, info) => {
        if (error) {
            res.status(500).json({ message: 'An error occurred while sending the email.' });
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ message: 'Email sent successfully.' });
        }
    });
}

module.exports = sendMail;