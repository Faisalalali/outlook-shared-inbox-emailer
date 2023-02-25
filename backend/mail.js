const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();
console.log(process.env.EMAIL_SERVICE);
function sendMail(req, res) {
    const { to, subject, message } = req.body;
    console.log(process.env.EMAIL_SERVICE);

    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const options = {
        from: process.env.EMAIL_SENDER,
        to,
        subject,
        html: message,
    };

    transporter.sendMail(options, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'An error occurred while sending the email.' });
        } else {
            console.log(info);
            res.json({ message: 'Email sent successfully.' });
        }
    });
}

module.exports = sendMail;