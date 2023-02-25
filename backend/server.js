const express = require('express');
const bodyParser = require('body-parser');

const sendMail = require('./mail');

const app = express();

// parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send-mail', (req, res) => {
    sendMail(req, res);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});