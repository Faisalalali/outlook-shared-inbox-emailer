const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

class Emailer {
    constructor() {
        if (Emailer.instance) {
            return Emailer.instance;
        }

        this.transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        Emailer.instance = this;
    }

    sendMail(to, subject, message, html, cc, bcc) {
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

        return new Promise((resolve, reject) => {
            this.transporter.sendMail(options, (error, info) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        });
    }

    
}

module.exports = new Emailer();