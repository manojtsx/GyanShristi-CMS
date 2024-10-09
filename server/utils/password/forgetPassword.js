const nodemailer = require('nodemailer');
const generateOTP = require('../otp/generateOTP');

const forgetPassword = async (email) => {
    const otp = generateOTP();

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
        subject: 'Reset your password',
        text: `Your OTP for resetting your password is ${otp}`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Reset Your Password</h2>
                <p>Your OTP for resetting your password is <strong>${otp}</strong></p>
                <p>Thank you for using GyanShristi CMS.</p>
                <p>Best regards,<br/>GyanShristi CMS Team</p>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return otp;
    } catch (err) {
        throw new Error('Error sending OTP');
    }
}

module.exports = forgetPassword;