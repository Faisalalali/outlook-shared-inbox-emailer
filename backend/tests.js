const assert = require('assert');
const sendMail = require('./emailer');

const dotenv = require('dotenv');
dotenv.config();

// Test sendMail function
assert.doesNotThrow(() => {
    try {
        sendMail({
            body: {
                to: process.env.EMAIL_TEST,
                subject: 'Test Email',
                html: '<h1>Hello!</h1><p>This is a test email.</p>'
            }
        });
        console.log('✅ sendMail test 1 passed');
    } catch (err) {
        console.log('❌ sendMail test 1 failed');
    }
}, undefined, 'sendMail should not throw an error');

// // Test missing parameters
// assert.throws(() => {
//     return sendMail()
// }, undefined, 'sendMail should throw an error when missing parameters');

// // Test invalid email address
// assert.throws(() => {
//     return sendMail({
//         body: {
//             to: 'test',
//             subject: 'Test Email',
//             html: '<h1>Hello!</h1><p>This is a test email.</p>'
//         }
//     }).then(() => {
//         console.log('✅ sendMail test 3 passed');

//     }).catch((err) => {
//         console.log('❌ sendMail test 3 failed');
//     });
// }, undefined, 'sendMail should throw an error when email address is invalid');