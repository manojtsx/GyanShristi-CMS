const verifyOTP = (otp, sentOTP) => {
    if (otp === sentOTP) {
        return true;
    }
    return false;
}
module.exports = verifyOTP;