const nodemailer = require('nodemailer');
const generateOTP = require('./generateOTP');
require('dotenv').config();

async function sendOTP(email){
    const otp = generateOTP();

    // Create a transporter object using the gmail SMTP
    const transporter = nodemailer.createTransport({
        service : 'gmail',
        host : 'smtp.gmail.com',
        secure : false,
        auth : {
            user : process.env.EMAIL_USER,
            pass : process.env.EMAIL_PASS
        }

    })

    // Setup email data with unicode symbols
    const mailOptions = {
        from : {
            name : 'GyanShristi CMS',
            address : process.env.EMAIL_USER
        },
        to : email,
        subject : 'Keep this OTP confidential',
        text : `Your OTP is ${otp}`,
        html : `
            <h1>Your OTP is ${otp}</h1>
        `
    }

    try{
        const info = await transporter.sendMail(mailOptions);
        return otp;
    }catch(err){
        throw new Error('Error sending OTP');
    }
}

module.exports = sendOTP;