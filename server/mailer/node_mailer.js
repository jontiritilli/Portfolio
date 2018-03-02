const nodemailer = require('nodemailer');
const credentials = require('./config');
const validator = require('validator');

module.exports = function (app) {
    app.post('/send', (req, res) => {
        nodemailer.createTestAccount((err, account) => {
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: credentials.user,
                    pass: credentials.password
                }
            });

            let mailOptions = {
                from: req.body.name,
                to: credentials.destination,
                replyTo: req.body.email,
                subject: req.body.subject,
                text: req.body.message
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.send(error);
                }
                res.send('success');
            });
        });
    })
}
