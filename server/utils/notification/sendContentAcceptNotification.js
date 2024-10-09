const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendContentAcceptNotification(email, contentTitle, contentId) {
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
        subject: 'Your Content Has Been Accepted!',
        text: `Congratulations! Your content titled "${contentTitle}" has been accepted.`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Congratulations!</h2>
                <p>Your content titled "<strong>${contentTitle}</strong>" has been accepted.</p>
                <p>Thank you for your contribution to GyanShristi CMS.</p>
                <p>Best regards,<br/>GyanShristi CMS Team</p>
                <p>You can view your content by <a href='${process.env.FRONTEND_URL}/post/${contentId}'>Clicking Here..</a></p>
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

module.exports = sendContentAcceptNotification;