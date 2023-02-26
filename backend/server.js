const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const emailer = require('./emailer');

const allowedIds = process.env.ALLOWED_IDS

const app = express();

// parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send-mail', (req, res) => {
    emailer.sendMail(req.body.to, req.body.subject, req.body.message, req.body.html, req.body.cc, req.body.bcc)
        .then((info) => console.log(info))
        .catch((err) => console.log(err));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});