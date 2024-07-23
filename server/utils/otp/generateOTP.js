const generateOTP = () =>{
    // Generate a random 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
}

module.exports = generateOTP;