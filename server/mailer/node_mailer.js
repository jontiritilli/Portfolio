const nodemailer = require('nodemailer');
const credentials = require('./config');

module.exports = function (app, path) {
    app.post('/send', (req, res) => {
        const output = `Test Email`
        console.log(req);

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
                from: 'Portfolio',
                to: 'jontiritilli@gmail.com',
                subject: 'Your Dateplan has been setup',
                html: output
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                res.send('email sent!')
            });
        });
    })
}
