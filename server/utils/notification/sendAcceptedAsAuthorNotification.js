const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendAcceptedAsAuthorNotification(email) {
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
        subject: 'You have been accepted as an author!',
        text: `Congratulations! You have been accepted as author in GyanShristi CMS.`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Congratulations!</h2>
                <p>You have been accepted as an author in GyanShristi CMS.</p>
                <p>Now, you can login into your dashboard and start writing your content by <a href='${process.env.FRONTEND_URL}/login'>loggin here...</a></p>
                <p>Thank you for your contribution to GyanShristi CMS.</p>
                <p>Best regards,<br/>GyanShristi CMS Team</p>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error('Error sending email: ', err);
        throw new Error('Error sending content acceptance notification');
    }
}

module.exports = sendAcceptedAsAuthorNotification;