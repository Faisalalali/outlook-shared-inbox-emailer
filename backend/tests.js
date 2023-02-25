const assert = require('assert');
const sendMail = require('./mail');

const dotenv = require('dotenv');
dotenv.config();

// Test sendMail function
assert.doesNotThrow(() => {
    sendMail({ body: { to: process.env.EMAIL_TEST, subject: 'Test Email', message: '<h1>Hello!</h1><p>This is a test email.</p>' } });
}, undefined, 'sendMail should not throw an error');

// Test missing parameters
assert.throws(() => {
    sendMail();
}, undefined, 'sendMail should throw an error when missing parameters');

// Test invalid email address
assert.throws(() => {
    sendMail('test', 'Test Email', '<h1>Hello!</h1><p>This is a test email.</p>');
}, undefined, 'sendMail should throw an error when email address is invalid');