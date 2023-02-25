const express = require('express');
const sendMail = require('../mail');

const app = express();

app.post('/send-mail', (req, res) => {
    sendMail(req, res);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});