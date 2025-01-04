const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendRejectedAsAuthorNotification(email) {
    // Create a transporter object using the gmail SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Setup email data with unicode symbols
    const mailOptions = {
        from: {
            name: 'GyanShristi CMS',
            address: process.env.EMAIL_USER
        },
        to: email,
        subject: 'You have been rejected as an author!',
        text: `Sorry! You have been rejected as author in GyanShristi CMS.`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;"> 
                <h2>Sorry!</h2>
                <p>You have been rejected as an author in GyanShristi CMS.</p>
                <p>Thank you for your interest in GyanShristi CMS.</p>
                <p>Best regards,<br/>GyanShristi CMS Team</p>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error('Error sending email: ', err);
        return null;
    }
}

module.exports = sendRejectedAsAuthorNotification;